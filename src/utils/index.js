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
  description,
  github_link,
  demo_link,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  imageLink: image_link,
  description,
  githubLink: github_link,
  demoLink: demo_link,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapProfileDBToModel = ({
  id,
  name,
  image_url,
  description,
  interest,
  weapon,
  social_media,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  imageUrl: image_url,
  description,
  interest,
  weapon,
  socialMedia: social_media,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = {
  mapExperiencesDBToModel,
  mapProjectsDBToModel,
  mapProfileDBToModel,
};
