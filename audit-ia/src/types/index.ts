// ============================================================
// Types pour l'application de gestion d'audit interne bancaire
// ============================================================

export interface EntiteOrganisationnelle {
  id: string;
  code: string;
  libelle: string;
  parentId: string | null;
  type: 'groupe' | 'filiale' | 'direction' | 'service' | 'succursale';
  dateDebut: string;
  dateFin: string | null;
  statut: 'actif' | 'inactif';
}

export interface Processus {
  id: string;
  code: string;
  libelle: string;
  parentId: string | null;
  niveau: 'macro' | 'processus' | 'sous-processus';
}

export interface Risque {
  id: string;
  taxonomie: string;
  libelle: string;
  categorie: 'credit' | 'marche' | 'liquidite' | 'operationnel' | 'conformite' | 'lcb-ft' | 'tic-cyber' | 'esg' | 'modele' | 'reputation';
}

export interface ObjetAuditable {
  id: string;
  libelle: string;
  entiteId: string;
  processusId: string;
  risqueIds: string[];
  criticite: 'faible' | 'modere' | 'eleve' | 'critique';
  frequenceCible: number;
  dernierAudit: string | null;
  prochainAuditMax: string | null;
  statut: 'actif' | 'inactif';
  recommandationsOuvertes: number;
  rattachementReglementaire: string[];
}

export interface EvaluationRisque {
  id: string;
  objetAuditableId: string;
  campagne: string;
  scoreInherent: number;
  scoreMaitrise: number;
  scoreGlobal: number;
  cote: 1 | 2 | 3 | 4;
  override: boolean;
  motifOverride: string | null;
  date: string;
}

export interface EquipeMembre {
  userId: string;
  role: 'chef_mission' | 'auditeur' | 'expert';
}

export interface Mission {
  id: string;
  reference: string;
  libelle: string;
  planId: string;
  objetsCouverts: string[];
  type: 'cycle' | 'demande_gouvernance' | 'obligation_reglementaire' | 'suite_incident' | 'demande_acpr';
  sensibilite: 'standard' | 'sensible';
  equipe: EquipeMembre[];
  budgetJours: number;
  joursConsommes: number;
  dateDebutPrevue: string;
  dateFinPrevue: string;
  dateDebutReelle: string | null;
  dateFinReelle: string | null;
  statut: 'planifiee' | 'preparation' | 'lettre_emise' | 'travaux_en_cours' | 'contradictoire' | 'projet_rapport' | 'rapport_valide' | 'cloturee' | 'suspendue' | 'annulee';
  etiquettes: string[];
  opinionGlobale: 'satisfaisant' | 'acceptable' | 'insuffisant' | 'critique' | null;
}

export interface Constat {
  id: string;
  missionId: string;
  reference: string;
  situation: string;
  critere: string;
  cause: string;
  consequence: string;
  cotation: 'mineur' | 'significatif' | 'majeur' | 'critique';
  risqueIds: string[];
  entiteId: string;
  statut: 'projet' | 'contradictoire' | 'valide';
  reponseAudite: string | null;
  etiquettes: string[];
}

export interface Recommandation {
  id: string;
  reference: string;
  constatIds: string[];
  libelle: string;
  priorite: 'faible' | 'moyenne' | 'elevee' | 'critique';
  responsableId: string;
  responsableNom: string;
  entite: string;
  echeanceCible: string;
  origine: 'interne' | 'acpr' | 'bce' | 'cac' | 'afa' | 'cnil';
  statut: 'emise' | 'plan_accepte' | 'en_cours' | 'declaree_mise_en_oeuvre' | 'verifiee_cloturee' | 'reportee' | 'caduque' | 'risque_accepte';
  tauxAvancement: number;
  nombreReports: number;
  dateCreation: string;
  missionId: string;
}

export interface PlanAudit {
  id: string;
  exercice: number;
  version: number;
  statut: 'elaboration' | 'avis_de' | 'approuve' | 'revise';
  dateValidation: string | null;
  missions: string[];
}

export interface Auditeur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  certifications: string[];
  competences: string[];
  disponibiliteJours: number;
  joursAffectes: number;
  avatar?: string;
}

export interface Document {
  id: string;
  nom: string;
  type: 'rapport' | 'lettre_mission' | 'feuille_travail' | 'preuve' | 'pv' | 'support_comite';
  objetPorteur: string;
  version: number;
  classification: 'interne' | 'confidentiel' | 'secret';
  auteur: string;
  dateCreation: string;
  dateModification: string;
  taille: string;
  hash: string;
}

export interface JournalAudit {
  id: string;
  horodatage: string;
  acteur: string;
  action: string;
  objet: string;
  detail: string;
}

export interface Notification {
  id: string;
  type: 'alerte' | 'info' | 'action' | 'echeance';
  message: string;
  date: string;
  lu: boolean;
  lien: string;
}
