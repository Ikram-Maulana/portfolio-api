/* eslint-disable camelcase */

const mapExperiencesDBToModel = ({
  id,
  period,
  position,
  description,
  created_at,
  updated_at,
}) => ({
  id,
  period,
  position,
  description,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapExperiencesDBToModel };
