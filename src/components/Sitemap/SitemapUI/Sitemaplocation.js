import React from "react"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Locations = [
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  }, {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  },
  {
    "state": "Workspace in Abuja"
  }

];


export default function Sitemaplocation() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col mx-24 leading-8">
      <div>
        <h1 className="text-xl">{t("Location")}</h1>
      </div>
      <Link to="Workspace in Abuja">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 text-[#428BF9] text-lg fex">
          {Locations.map((state) => (
            <li>{state.state}</li>
          ))}
        </div>
      </Link>
      <div className="mx-auto mt-6">
        <button className="py-3 text-lg rounded px-4 bg-[#FCFCFC] text-[#0559FD] hover:bg-orange-500">{t("Load More")}</button>
      </div>
    </div>
  )
}