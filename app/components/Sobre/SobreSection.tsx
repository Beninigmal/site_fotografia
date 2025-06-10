"use client"; // Porque usa interatividade

import { motion } from "framer-motion";
import BioCard from "./BioCard";
import Assinatura from "./Assinatura";

export default function SobreSection({ bioData }) {
  return (
    <section className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <BioCard data={bioData} />
        <Assinatura signature={bioData.signature} />
      </motion.div>
    </section>
  );
}
