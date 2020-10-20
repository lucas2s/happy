import { Request, Response} from 'express'
import { getRepository } from 'typeorm'

import Orphanage from '../models/Orphanage';

export default {

  async show(request:Request, reponse:Response) {

    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return reponse.json(orphanage);
  },

  async index(request:Request, reponse:Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return reponse.json(orphanages);
  },

  async create(request:Request, reponse:Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename}
    })

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    console.log(orphanage);
  
    await orphanagesRepository.save(orphanage);
  
    return reponse.status(201).json(orphanage);
  }
}