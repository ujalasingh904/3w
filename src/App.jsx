import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Home, PlusCircle, Settings, Trophy, ChevronRight, Star } from "lucide-react";
import image from "./assets/image.png";

export default function App() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [points, setPoints] = useState(5982);
  const [earnings, setEarnings] = useState(2875.0);

  const tasks = [
    { id: 1, title: "Monthly leaderboard winner 🏆", points: 10, icon: Trophy },
    { id: 2, title: "Share with 5 friends! 📢", points: 10, icon: Instagram },
    { id: 3, title: "Earn daily win Big Reward! ⭐", points: 10, icon: Star },
    { id: 4, title: "Claim 10 Points Every Hour ➕", points: 10, icon: PlusCircle },
    { id: 5, title: "Weekly Leaderboard Prize 💥", points: 10, icon: Trophy },
    { id: 6, title: "Like the Instagram Post 🎇", points: 10, icon: Instagram },
  ];

  const toggleTask = (id) => {
    setCompletedTasks((prev) => {
      const task = tasks.find((t) => t.id === id);
      if (prev.includes(id)) {
        setPoints(points - task.points);
        return prev.filter((taskId) => taskId !== id);
      } else {
        setPoints(points + task.points);
        return [...prev, id];
      }
    });
  };

  console.log(completedTasks)

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => +(prev + 0.01).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-500 via-red-600 to-orange-400 text-white p-4 sm:p-6">

      <header className="flex flex-row justify-between items-center mb-6 sm:mb-8">

        <div className="flex items-center">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Task Master</h1>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2"
          >
            <Trophy className="text-yellow-300  w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-md sm:text-xl font-semibold">{points}</span>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="bg-white/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2"
          >
            <span className="text-green-300">$</span>
            <span className="text-md sm:text-xl font-semibold">{earnings.toFixed(2)}</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }} 
          >
            <img src={image} alt="Task Planet Logo" width={40} height={40} className="w-[3.3rem] sm:w-[3rem] rounded-full" />
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, delay: index * 0.2 }}
            className={`bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 flex justify-between items-center cursor-pointer ${
              completedTasks.includes(task.id) ? "bg-white/30" : ""
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-white/20 p-1.5 sm:p-2 rounded-full">
                <task.icon className="text-white w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span className={`text-sm sm:text-lg ${completedTasks.includes(task.id) ? "line-through text-white/60" : ""}`}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="font-semibold text-sm sm:text-lg">{task.points}</span>
              {completedTasks.includes(task.id) ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-green-500 rounded-full p-0.5 sm:p-1"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
              ) : (
                <ChevronRight className="text-white/60 w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <nav className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white/10 backdrop-blur-md rounded-full p-2">
        <ul className="flex justify-around">
          {[Home, PlusCircle, Settings, Trophy].map((Icon, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
            >
              <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
}