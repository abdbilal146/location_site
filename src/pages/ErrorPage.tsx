import { Link, useParams, useSearch } from "@tanstack/react-router";
import "./ErrorPage.scss";

interface ErrorPageProps {
  errorCode?: string | number;
  title?: string;
  message?: string;
}

// 1. Définition stricte de ce qu'on attend dans l'URL (?title=...&message=...)
interface ErrorSearchParams {
  title?: string;
  message?: string;
}

export default function ErrorPage({
  errorCode = "404",
  title = "Page Introuvable",
  message = "Oups ! La page que vous recherchez semble avoir pris une autre route.",
}: ErrorPageProps) {
  let paramCode: string | undefined;
  let searchParams: ErrorSearchParams = {};

  // 2 Récupération sécurisée des params d'URL
  try {
    const params = useParams({ from: "/error/$code" });
    paramCode = params.code;
  } catch {
    paramCode = undefined;
  }

  // 3 Récupération sécurisée des search params
  try {
    searchParams = useSearch({ strict: false }) as ErrorSearchParams;
  } catch {
    searchParams = {};
  }

  const finalErrorCode = paramCode ?? errorCode;

  let defaultTitleForCode = title;
  let defaultMessageForCode = message;

  if (
    title === "Page Introuvable" &&
    message ===
      "Oups ! La page que vous recherchez semble avoir pris une autre route."
  ) {
    switch (String(finalErrorCode)) {
      case "403":
        defaultTitleForCode = "Accès Refusé";
        defaultMessageForCode =
          "Vous n'êtes pas autorisé à accéder à cette page.";
        break;
      case "404":
        // On laisse les valeurs par défaut
        break;
      case "500":
        defaultTitleForCode = "Erreur Serveur";
        defaultMessageForCode =
          "Un problème inattendu est survenu de notre côté. Veuillez réessayer plus tard.";
        break;
      default:
        // Pour les autres codes (400, 401, etc.)
        if (String(finalErrorCode) !== "404") {
          defaultTitleForCode = "Une erreur est survenue";
          defaultMessageForCode = "Nous avons rencontré un problème inattendu.";
        }
    }
  }

  // Priorité : URL (Search Params) > Props (si modifiées) > Valeurs par défaut du Switch
  const finalTitle = searchParams.title ?? defaultTitleForCode;
  const finalMessage = searchParams.message ?? defaultMessageForCode;

  return (
    <div className="error-page-container">
      <div className="error-card">
        <div className="icon-circle">
          {String(finalErrorCode) === "404" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
        </div>

        <h1 className="error-code">{finalErrorCode}</h1>
        <h2 className="error-title">{finalTitle}</h2>
        <p className="error-description">{finalMessage}</p>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            Retour à l'accueil
          </Link>
          <Link to="/cars" className="btn btn-secondary">
            Voir nos véhicules
          </Link>
        </div>
      </div>

      <div className="error-footer">
        <p>Vous cherchez peut-être :</p>
        <div className="suggested-links">
          <Link to="/cars">Nos Véhicules</Link>
          <span className="separator">•</span>
          <a href="#contact">Contact</a>
          <span className="separator">•</span>
          <Link to="/login">Connexion</Link>
        </div>
      </div>
    </div>
  );
}
