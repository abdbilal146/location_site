import React, { useState, useEffect } from "react";
import {
  IconX,
  IconUser,
  IconMapPin,
  IconDeviceFloppy,
  IconChevronRight,
  IconChevronLeft,
  IconUpload,
  IconFileDescription,
} from "@tabler/icons-react";
import "./AddClientModal.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewClient } from "../api/client";
import { addNewIdentityFile } from "../api/file";
import axios from "axios";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    status: true,
  });

  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        status: true,
      });
      setCurrentStep(1);
      setIdentityFile(null);
      setLicenseFile(null);
      setIsUploading(false);
    }
  }, [isOpen]);

  const mutation = useMutation({
    mutationKey: ["clients"],
    mutationFn: addNewClient,
  });

  const addNewFile = useMutation({
    mutationKey: ["file"],
    mutationFn: addNewIdentityFile,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleIdentityFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIdentityFile(e.target.files[0]);
    }
  };

  const handleLicenseFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const createNewClient = async (newClient: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: {
      address: string;
      city: string;
      postalCode: string;
    };
    accountStatus: boolean;
  }) => {
    try {
      setIsUploading(true);

      // Create client
      const data = await mutation.mutateAsync(newClient);
      const clientId = data?.id || data?.[0]?.id || 2; // Fallback to 2 for safety if id is hidden

      // Upload Identity File if exists
      if (identityFile) {
        const uploadData = await addNewFile.mutateAsync({
          clientId: clientId,
          originalName: "id_card_" + identityFile.name,
          contentType: identityFile.type,
        });

        if (uploadData?.uploadUrl) {
          await axios.put(uploadData.uploadUrl, identityFile, {
            headers: { "Content-Type": identityFile.type },
          });
        }
      }

      // Upload License File if exists
      if (licenseFile) {
        const uploadData = await addNewFile.mutateAsync({
          clientId: clientId,
          originalName: "licence_card_" + licenseFile.name,
          contentType: licenseFile.type,
        });

        if (uploadData?.uploadUrl) {
          await axios.put(uploadData.uploadUrl, licenseFile, {
            headers: { "Content-Type": licenseFile.type },
          });
        }
      }

      queryClient.invalidateQueries({ queryKey: ["clients"] });
      onClose();
    } catch (error) {
      console.error("there is an error with the call", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      const address = {
        address: formData.address,
        city: formData.city,
        postalCode: formData.zipCode,
      };

      createNewClient({
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        address: address,
        accountStatus: formData.status,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="client-modal-overlay">
      <div className="add-client-modal">
        <header className="modal-header">
          <div className="modal-header-top">
            <h2>Ajouter un Nouveau Client</h2>
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
              disabled={isUploading}
            >
              <IconX size={20} />
            </button>
          </div>
          <div className="stepper">
            <div className={`step ${currentStep === 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <span className="step-title">Informations</span>
            </div>
            <div className="step-divider"></div>
            <div className={`step ${currentStep === 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <span className="step-title">Documents</span>
            </div>
          </div>
        </header>

        <form className="modal-form" onSubmit={onSubmitForm}>
          {currentStep === 1 ? (
            <>
              <section className="form-section flex-col">
                <div className="form-section-header">
                  <IconUser size={18} />
                  <h3>Informations Personnelles</h3>
                </div>

                <div className="form-group full-width">
                  <label>Nom Complet *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ex: Marie Dubois"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@exemple.com"
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label>Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="form-section flex-col">
                <div className="form-section-header">
                  <IconMapPin size={18} />
                  <h3>Adresse</h3>
                </div>

                <div className="form-group full-width">
                  <label>Adresse Complète</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="ex: 15 Rue de la Paix"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="ex: Paris"
                    />
                  </div>
                  <div className="form-group half">
                    <label>Code Postal</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="ex: 75002"
                    />
                  </div>
                </div>
              </section>

              <div className="form-group full-width">
                <label>Statut du Compte *</label>
                <select
                  name="status"
                  value={formData.status.toString()}
                  onChange={handleChange}
                >
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Annuler
                </button>
                <button type="submit" className="btn-submit">
                  Suivant <IconChevronRight size={18} />
                </button>
              </footer>
            </>
          ) : (
            <>
              <section className="form-section flex-col">
                <div className="form-section-header">
                  <IconFileDescription size={18} />
                  <h3>Documents du Client</h3>
                </div>

                <div className="form-group full-width">
                  <label>Carte d'Identité *</label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("identity-upload")?.click()
                    }
                  >
                    <div className="upload-icon">
                      <IconUpload size={24} />
                    </div>
                    <p className="upload-title">
                      {identityFile
                        ? identityFile.name
                        : "Cliquez pour télécharger"}
                    </p>
                    <p className="upload-subtitle">
                      {identityFile
                        ? `${(identityFile.size / 1024 / 1024).toFixed(2)} MB`
                        : "PNG, JPG ou PDF (max. 10MB)"}
                    </p>
                    <input
                      id="identity-upload"
                      type="file"
                      accept="image/png, image/jpeg, application/pdf"
                      style={{ display: "none" }}
                      onChange={handleIdentityFileChange}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Permis de Conduire *</label>
                  <div
                    className="upload-box"
                    onClick={() =>
                      document.getElementById("license-upload")?.click()
                    }
                  >
                    <div className="upload-icon">
                      <IconUpload size={24} />
                    </div>
                    <p className="upload-title">
                      {licenseFile
                        ? licenseFile.name
                        : "Cliquez pour télécharger"}
                    </p>
                    <p className="upload-subtitle">
                      {licenseFile
                        ? `${(licenseFile.size / 1024 / 1024).toFixed(2)} MB`
                        : "PNG, JPG ou PDF (max. 10MB)"}
                    </p>
                    <input
                      id="license-upload"
                      type="file"
                      accept="image/png, image/jpeg, application/pdf"
                      style={{ display: "none" }}
                      onChange={handleLicenseFileChange}
                    />
                  </div>
                </div>
              </section>

              <div className="info-note">
                <strong>Note:</strong> Ces documents sont obligatoires pour la
                location de véhicules. Assurez-vous que les documents sont
                clairs et lisibles.
              </div>

              <footer className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setCurrentStep(1)}
                  disabled={isUploading}
                >
                  <IconChevronLeft size={18} /> Précédent
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <span className="loader"></span>
                  ) : (
                    <IconDeviceFloppy size={18} />
                  )}
                  {isUploading ? "Ajout en cours..." : "Ajouter le Client"}
                </button>
              </footer>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
