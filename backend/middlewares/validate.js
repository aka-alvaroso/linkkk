const validate = (schema) => (req, res, next) => {
  const body = req.body;
  const params = req.params;

  const data = { ...body, ...params };
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({ error: "Datos inválidos", details: errors });
  }

  req.body = result.data;
  next();
};

module.exports = validate;
