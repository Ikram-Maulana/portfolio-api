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

const mapProjectsDBToModel = ({
  id,
  name,
  image_link,
  tech,
  github_link,
  demo_link,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  imageLink: image_link,
  tech,
  githubLink: github_link,
  demoLink: demo_link,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapExperiencesDBToModel, mapProjectsDBToModel };
