import { getCustomRepository } from 'typeorm';
import { ZoomRepository } from '../database/zoom/repo/zoom.repo';
import { Request, Response } from 'express';
import { ZoomUserRepository } from '../database/zoom/repo/zoomuser.repo';

export class ZoomsController {
  //! zoom
  static async addZoom(req: Request, res: Response) {
    let zoomsRepository = getCustomRepository(ZoomRepository);
    await zoomsRepository.submitZoomData(req, res);
  }

  static async fetchZoom(req: Request, res: Response) {
    let zoomsRepository = getCustomRepository(ZoomRepository);
    await zoomsRepository.fetchZoomdetails(req, res);
  }

  static async updatezoomSlot(req: Request, res: Response) {
    let zoomsRepository = getCustomRepository(ZoomRepository);
    await zoomsRepository.updateZoomAvailableSlot(req, res);
  }

  static async updatezoom(req: Request, res: Response) {
    let zoomsRepository = getCustomRepository(ZoomRepository);
    await zoomsRepository.updateZoom(req, res);
  }

  static async updatezoomdate(req: Request, res: Response) {
    let zoomsRepository = getCustomRepository(ZoomRepository);
    await zoomsRepository.updateZoomdate(req, res);
  }

  static async updateZoomIsenable(req: Request, res: Response) {
    let zoomsRepository = getCustomRepository(ZoomRepository);
    await zoomsRepository.updateZoomIsenable(req, res);
  }

  //! zoom user
  static async addZoomuser(req: Request, res: Response) {
    let zoomUserRepository = getCustomRepository(ZoomUserRepository);
    await zoomUserRepository.registerUserZoomData(req, res);
  }
  static async fetchallUserData(req: Request, res: Response) {
    let zoomUserRepository = getCustomRepository(ZoomUserRepository);
    await zoomUserRepository.fetchallUserData(req, res);
  }
  static async checkUserZoomData(req: Request, res: Response) {
    let zoomUserRepository = getCustomRepository(ZoomUserRepository);
    await zoomUserRepository.checkUserZoomData(req, res);
  }
  static async removeAllUserZoomData(req: Request, res: Response) {
    let zoomUserRepository = getCustomRepository(ZoomUserRepository);
    await zoomUserRepository.removeAllUserZoomData(req, res);
  }
}
