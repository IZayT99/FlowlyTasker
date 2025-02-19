"use client";

import React from "react";
import { CreditCard, Calendar, Briefcase, FileText, CheckCircle, Users, BarChart } from "lucide-react";

const Dash = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Subscription Information Card */}
      <div className="flex-1 bg-gradient-to-b from-gray-600 to-white text-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <CreditCard className="w-8 h-8 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold">Informations sur l'abonnement</h2>
        </div>
        <ul className="text-lg space-y-2">
          <li className="flex items-center">
            <FileText className="w-5 h-5 text-blue-500 mr-2" />
            Nom du plan, date de début, date de renouvellement
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            Gratuit, Premium, Entreprise, etc.
          </li>
          <li className="flex items-center">
            <CreditCard className="w-5 h-5 text-blue-500 mr-2" />
            Méthode de paiement, historique des paiements, prochaines facturations
          </li>
          <li className="flex items-center">
            <Users className="w-5 h-5 text-blue-500 mr-2" />
             Annuler, mettre à niveau ou modifier l'abonnement
          </li>
        </ul>
      </div>

      {/* Calendar Information Card */}
      <div className="flex-1 bg-gradient-to-b from-gray-600 to-white text-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Calendar className="w-8 h-8 text-green-500 mr-2" />
          <h2 className="text-2xl font-bold">Informations sur le calendrier</h2>
        </div>
        <ul className="text-lg space-y-2">
          <li className="flex items-center">
            <FileText className="w-5 h-5 text-green-500 mr-2" />
            Réunions, tâches, rappels
          </li>
          <li className="flex items-center">
            <Calendar className="w-5 h-5 text-green-500 mr-2" />
            Créer un événement, inviter des participants
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Ajouter des tâches, définir des priorités
          </li>
          <li className="flex items-center">
            <Users className="w-5 h-5 text-green-500 mr-2" />
            Google Calendar, Outlook, etc.
          </li>
        </ul>
      </div>

      {/* Project Information Card */}
      <div className="flex-1 bg-gradient-to-b from-gray-600 to-white text-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Briefcase className="w-8 h-8 text-purple-500 mr-2" />
          <h2 className="text-2xl font-bold">Informations sur les projets</h2>
        </div>
        <ul className="text-lg space-y-2">
          <li className="flex items-center">
            <FileText className="w-5 h-5 text-purple-500 mr-2" />
             Nom, description, statut
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 text-purple-500 mr-2" />
             Tâches complétées, échéances à venir
          </li>
          <li className="flex items-center">
            <Users className="w-5 h-5 text-purple-500 mr-2" />
             Membres du projet, rôles, commentaires
          </li>
          <li className="flex items-center">
            <BarChart className="w-5 h-5 text-purple-500 mr-2" />
             Graphiques, statistiques, performances
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dash;
