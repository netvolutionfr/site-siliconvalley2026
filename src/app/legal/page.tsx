export default function LegalPage() {
    return (
        <main className="min-h-dvh bg-bg text-fg">
            <section className="mx-auto max-w-3xl px-4 py-16">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Mentions légales</h1>
                <p className="mt-2 text-sm text-neutral-500">Dernière mise à jour : 21 octobre 2025</p>

                <div className="mt-8 space-y-10">
                    {/* Éditeur */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Éditeur du site</h2>
                        <div className="mt-2 text-neutral-700 space-y-1">
                            <p><strong>Établissement :</strong> Lycée Campus St Joseph</p>
                            <p><strong>Adresse :</strong> 26-30 Route de Calais - 62280 St Martin Boulogne</p>
                            <p><strong>Téléphone : 03 21 99 06 99</strong> </p>
                            <p><strong>Site web :</strong> <a href="https://www.st-jo.com/fr/">www.st-jo.com</a></p>
                            <p><strong>Responsable de la publication :</strong> Stanis Humez, prof. d&#39;informatique</p>
                        </div>
                    </section>

                    {/* Hébergement */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Hébergement</h2>
                        <div className="mt-2 text-neutral-700 space-y-1">
                            <p><strong>Hébergeur :</strong> [Vercel / autre prestataire]</p>
                            <p><strong>Adresse :</strong> [Adresse de l’hébergeur]</p>
                            <p><strong>Site :</strong> [URL de l’hébergeur]</p>
                        </div>
                    </section>

                    {/* Propriété intellectuelle */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
                        <p className="mt-2 text-neutral-700">
                            Les contenus de ce site (textes, photos, visuels, logos) sont protégés par le droit d’auteur et/ou les droits voisins.
                            Toute reproduction, représentation, modification, adaptation, totale ou partielle, est interdite sans autorisation écrite préalable de l’éditeur.
                        </p>
                    </section>

                    {/* Responsabilité */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Responsabilité</h2>
                        <p className="mt-2 text-neutral-700">
                            Les informations publiées sont fournies à titre indicatif et peuvent évoluer. Les liens externes sont proposés pour faciliter l’accès à d’autres ressources ;
                            l’éditeur ne peut être tenu responsable de leur contenu.
                        </p>
                    </section>

                    {/* Données personnelles (RGPD) */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Données personnelles (RGPD)</h2>
                        <div className="mt-3 space-y-4 text-neutral-700">
                            <div>
                                <h3 className="font-medium">Données collectées</h3>
                                <p>Via le formulaire de pré‑inscription : nom, prénom, adresse e‑mail, (optionnel) motivation/message. Journalisation technique minimale (horodatage, User‑Agent).</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Finalités</h3>
                                <ul className="list-disc pl-5">
                                    <li>Gestion des demandes de pré‑inscription et communication liée au projet ;</li>
                                    <li>Organisation logistique du voyage (suivi des participants, informations pratiques) ;</li>
                                    <li>Traçabilité de sécurité (journal technique minimal).</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium">Base légale</h3>
                                <p>Mission d’intérêt public de l’établissement scolaire et/ou consentement de la personne concernée pour la prise de contact initiale.</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Destinataires</h3>
                                <p>Équipe pédagogique/administrative en charge du projet. Aucun transfert commercial à des tiers. Sous‑traitants techniques strictement nécessaires (hébergeur, e‑mail SMTP).</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Durées de conservation</h3>
                                <p>Durée du projet + 12 mois pour la traçabilité. Les journaux techniques sont conservés pour une durée limitée et proportionnée.</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Sécurité</h3>
                                <p>Mesures raisonnables de sécurité technique et organisationnelle (accès restreints, mots de passe robustes, chiffrement des communications TLS).</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Vos droits</h3>
                                <p>Vous disposez des droits d’accès, rectification, effacement, limitation, opposition et portabilité, dans les conditions prévues par les articles 15 à 22 du RGPD.</p>
                                <p className="mt-2">Pour exercer vos droits : contactez <strong>[email de contact RGPD]</strong> en précisant votre identité et l’objet de votre demande.</p>
                                <p className="mt-2">Délégué(e) à la protection des données (DPO) / Référent·e RGPD : <strong>[Nom, e‑mail]</strong>.</p>
                                <p className="mt-2 text-sm text-neutral-500">Vous pouvez également saisir l’autorité de contrôle compétente (CNIL) en cas de difficulté.</p>
                            </div>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Cookies</h2>
                        <p className="mt-2 text-neutral-700">
                            Nous n’utilisons pas de cookies tiers ni de traceurs publicitaires. Seuls des cookies strictement
                            nécessaires au fonctionnement du site peuvent être déposés (par exemple, préférences d’affichage,
                            équilibre de charge). Aucune mesure d’audience non‑exemptée n’est mise en place.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Modifications</h2>
                        <p className="mt-2 text-neutral-700">Ces mentions peuvent être mises à jour pour refléter l’évolution du projet ou du cadre légal. La date de mise à jour figure en haut de page.</p>
                    </section>

                    {/* Droit applicable */}
                    <section className="card p-6">
                        <h2 className="text-xl font-semibold">Droit applicable</h2>
                        <p className="mt-2 text-neutral-700">Le présent site et ses mentions sont soumis au droit français.</p>
                    </section>
                </div>
            </section>
        </main>
    );
}

