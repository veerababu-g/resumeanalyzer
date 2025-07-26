const pool = require('../db');
const { analyzeResume } = require('../services/analysisService');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const result = await analyzeResume(req.file.buffer);

    const insertQuery = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills,
        projects, certifications, resume_rating, improvement_areas, upskill_suggestions
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;
    `;

    const values = [
      req.file.originalname,
      result.name,
      result.email,
      result.phone,
      result.linkedin_url,
      result.portfolio_url,
      result.summary,
      JSON.stringify(result.work_experience),
      JSON.stringify(result.education),
      JSON.stringify(result.technical_skills),
      JSON.stringify(result.soft_skills),
      JSON.stringify(result.projects),
      JSON.stringify(result.certifications),
      result.resume_rating,
      result.improvement_areas,
      JSON.stringify(result.upskill_suggestions)
    ];

    const dbRes = await pool.query(insertQuery, values);
    res.status(201).json(dbRes.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, file_name, uploaded_at, name, email, resume_rating FROM resumes ORDER BY uploaded_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Resume not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
};
