import { Request, Response} from 'express'
import { getRepository } from 'typeorm'

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {

  async show(request:Request, reponse:Response) {

    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return reponse.json(orphanageView.render(orphanage));
  },

  async index(request:Request, reponse:Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return reponse.json(orphanageView.renderMany(orphanages));
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

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      latitude: Yup.number().required('Latitude obrigatório'),
      longitude: Yup.number().required('Longitude obrigatório'),
      about: Yup.string().required('Sobre obrigatório').max(300, 'Máximo de 300 caracteres.'),
      instructions: Yup.string().required('Instruções obrigatório'),
      opening_hours: Yup.string().required('Horário obrigatório'),
      open_on_weekends: Yup.boolean().required('Finais de semana obrigatório'),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      )
    });

    const dataCast = schema.cast(data);
    data.latitude = dataCast?.latitude;
    data.longitude = dataCast?.longitude;
    data.open_on_weekends = dataCast?.open_on_weekends;

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);
  
    return reponse.status(201).json(orphanageView.render(orphanage));
  }
}