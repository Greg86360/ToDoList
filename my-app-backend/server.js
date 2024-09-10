const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taches', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define Task schema and model
const TaskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  frequence: { type: String, default: false },
});

const Task = mongoose.model('Task', TaskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Route PATCH pour mettre à jour une partie de la tâche (par exemple, son état)
app.patch('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body; // Les données envoyées dans la requête PATCH
    
    // Mettre à jour la tâche dans la base de données avec les nouvelles données
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(updatedTask); // Retourner la tâche mise à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
