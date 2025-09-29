# Checklist Audit Legacy (AS400 / Java Swing)

## UI / UX
- [ ] Écrans critiques identifiés (volumétrie utilisateurs)
- [ ] Accessibilité, responsive, support périphériques
- [ ] Maquettes / composants réutilisables existants

## Code & architecture
- [ ] Couplage UI/métier (monolithique, MVC)
- [ ] Tests automatisés existants (unit, intégration)
- [ ] Documentation architecture (diagrammes, patterns utilisés)

## Base de données & data
- [ ] Schéma DB2 (tables, triggers, procédures, tailles)
- [ ] Flux batch (exports, ETL, reports)
- [ ] Indicateurs de charge (TPS, batch window)

## Intégrations externes
- [ ] Interfaces (MQ, FTP, API SOAP/REST)
- [ ] SLA / contrats service
- [ ] Points de fragilité (single point of failure)

## Sécurité & conformité
- [ ] Gestion des accès (LDAP, custom, inline)
- [ ] Audit logs, traçabilité
- [ ] Conformité réglementaire (GDPR, SOX, PCI…)

## Ops & supervision
- [ ] Monitoring existant (Zabbix, Nagios, Splunk…)
- [ ] Gestion incidents / MTTR
- [ ] Process déploiement, rollback

## Compétences & gouvernance
- [ ] Skills internes (Java Swing, AS400, Angular/Spring Boot)
- [ ] Sponsors métier engagés
- [ ] Documentation vivante ou obsolète

## Quick wins potentiels
- [ ] Reportings read-only
- [ ] API façade pour mobile / nouvelle UI
- [ ] Automatisation batch / job scheduling
