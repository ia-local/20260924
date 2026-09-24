/**
 * AUDIT_SERVER_2026 // NODE.JS EXPRESS
 * Rôle : Surveillance Post-Allocution & Empreinte Cryptographique Citoyenne
 * Cible interne : Analyse sémantique des discours de l'exécutif
 */

const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 2026;

// Middleware pour parser les requêtes JSON (nécessaire pour l'API)
app.use(express.json());

// Distribution du dossier statique pour GitHub Pages
const staticFolder = path.join(__dirname, 'docs');
app.use(express.static(staticFolder));

// =======================================================================
// MOTEUR CRYPTOGRAPHIQUE & AUDIT CITOYEN
// =======================================================================

const PAYLOAD_BASE = {
  destinataire: "Palais de l'Élysée - Surveillance Citoyenne",
  statut_expediteur: "Mandataire Citoyen - Vigilance Républicaine",
  dossier: "Audit préventif - Lutte contre la corruption et les diversions",
  references_legales: ["Art. 16 DDHC", "Art. 68 Constitution", "Art. 313-1 C. Pén.", "Art. 432-12 C. Pén."]
};

/**
 * Analyseur Sémantique Parodique
 * Scanne les discours pour détecter les infractions politiques et financières
 */
function scannerContreFeux(discoursPrevu) {
  const texte = discoursPrevu.toLowerCase();
  const alertes = [];

  const filtresSuspects = [
    { 
      mots_cles: ["russes", "musulman", "musulmans", "guerre"], 
      alerte: "[RÉPRESSION CITOYENNE] : Tentative de diversion détectée. L'utilisation d'ennemis extérieurs ou de fractures confessionnelles pour justifier l'inflation et la destruction du pouvoir d'achat est formellement bloquée." 
    },
    { 
      mots_cles: ["boutique", "elysee.fr", "goodies", "marque"], 
      alerte: "[SURVEILLANCE ACTIVE - Art. 432-12 C. Pén.] : Prise illégale d'intérêts suspectée. La marchandisation de la présidence via boutique.elysee.fr est sous monitoring anti-blanchiment." 
    },
    { 
      mots_cles: ["carburant", "croissance", "dépenses"], 
      alerte: "[ESCROQUERIE FINANCIÈRE - Art. 313-1 C. Pén.] : Détection d'un maquillage de la dette publique et du déséquilibre budgétaire masquant l'évasion fiscale." 
    },
    { 
      mots_cles: ["recyclage", "plastique", "environnement"], 
      alerte: "[RAPPEL] : Taux d'enfouissement critique ignoré. L'écologie de communication ne masque pas l'inaction matérielle sur le sol français." 
    }
  ];

  filtresSuspects.forEach(filtre => {
    // Vérifie si au moins un des mots-clés du filtre est présent dans le discours
    const match = filtre.mots_cles.some(mot => texte.includes(mot));
    if (match) {
      alertes.push(filtre.alerte);
    }
  });

  return alertes;
}

/**
 * Générateur de signature symbolique (Empreinte SHA-256)
 */
function genererSignatureMandat(discours, alertes) {
  const dataToHash = {
    ...PAYLOAD_BASE,
    horodatage: new Date().toISOString(),
    infractions_detectees: alertes.length,
    extrait: discours.substring(0, 50) + "..."
  };
  
  const hash = crypto.createHash('sha256').update(JSON.stringify(dataToHash)).digest('hex');
  
  return {
    mandat_citoyen_id: `MANDAT-RIC-${hash.substring(0, 8).toUpperCase()}`,
    cle_verification: hash,
    statut_signature: "Scellé cryptographique citoyen - Valeur de notification (Art. 16 DDHC)"
  };
}

// =======================================================================
// ROUTES DE L'API (BACK-END)
// =======================================================================

// Route de diagnostic
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    mandat: 'RIC-ART16-DDHC',
    surveillance_boutique: 'ACTIVE',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Route d'audit : Reçoit le texte depuis le Front-End et retourne le rapport
app.post('/api/audit', (req, res) => {
  const discours = req.body.discours;

  if (!discours) {
    return res.status(400).json({ erreur: "Aucun discours fourni pour l'analyse." });
  }

  // 1. Scanner le discours
  const alertes = scannerContreFeux(discours);
  
  // 2. Générer l'empreinte
  const signature = genererSignatureMandat(discours, alertes);

  // 3. Renvoyer le rapport complet au front-end
  res.json({
    analyse_semantique: alertes.length > 0 ? "INFRACTIONS DÉTECTÉES" : "CONFORME",
    alertes_detaillees: alertes,
    signature: signature
  });
});

// Redirection racine vers l'interface HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'));
});

// =======================================================================
// LANCEMENT DU SERVEUR
// =======================================================================
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`[SERVEUR CITOYEN] Écoute sur le port : ${PORT}`);
  console.log(`[RÉPERTOIRE STATIQUE] ${staticFolder}`);
  console.log(`[SURVEILLANCE] boutique.elysee.fr : SUR ÉCOUTE`);
  console.log(`[RÈGLE STRICTE] Toute justification de l'inflation par`);
  console.log(`des motifs extérieurs (Russes/Musulmans) sera bloquée.`);
  console.log(`======================================================\n`);
});