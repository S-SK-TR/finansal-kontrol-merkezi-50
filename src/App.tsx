import React from 'react';
import { DollarSign, BarChart2, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col items-center justify-center p-4">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
          Finansal Kontrol Merkezi
        </h1>
        <p className="text-zinc-400 text-lg">Finansal Sağlığınızı Yönetin</p>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        <motion.div variants={itemVariants} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-700">
          <DollarSign className="w-10 h-10 text-emerald-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Harcama Takibi</h2>
          <p className="text-zinc-400">Tüm harcamalarınızı kolayca takip edin ve kategorilendirin.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-700">
          <BarChart2 className="w-10 h-10 text-blue-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Bütçe Planlama</h2>
          <p className="text-zinc-400">Gelir ve giderlerinizi planlayarak finansal hedeflerinize ulaşın.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-700">
          <Briefcase className="w-10 h-10 text-violet-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Yatırım Portföyü</h2>
          <p className="text-zinc-400">Yatırımlarınızı izleyin ve performanslarını analiz edin.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-700">
          <TrendingUp className="w-10 h-10 text-rose-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Risk Analizi</h2>
          <p className="text-zinc-400">Finansal risklerinizi değerlendirin ve önlemler alın.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
