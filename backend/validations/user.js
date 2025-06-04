const z = require("zod");

const updateUserPlanSchema = z.object({
  planId: z.number().min(1, "planId requerido"),
});

module.exports = {
  updateUserPlanSchema,
};
