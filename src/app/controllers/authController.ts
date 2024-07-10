import { Response } from 'express';
import * as middleware from '../middleware/middleware';
import * as models from '../models/models';
import bcrypt from 'bcrypt';
import * as fs from 'fs';
import { UserRequest, CompanyRequest } from "../interfaces/authInterface"

export async function userRegister(request: UserRequest, response: Response): Promise<void> {
  try {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      response.status(400).json({ error: 'Invalid data' });
      return;
    }

    const instanceUser = await models.User.findOne({ where: { email } });
    if (instanceUser) {
      response.status(400).json({ error: 'Email is used' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await models.User.create({
      username,
      email,
      password: hashedPassword,
    });

    response.status(201).json(savedUser);
  } catch (error) {
    fs.appendFileSync('./server.log', `${error}\n`);
    response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export async function userLogin(request: UserRequest, response: Response): Promise<void> {
  try {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      response.status(401).json({ error: 'Invalid data' });
      return;
    }

    const user = await models.User.findOne({ where: { username, email }, raw: true });
    if (!user) {
      response.status(401).json({ error: 'Invalid data' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      response.status(401).json({ error: 'Invalid data' });
      return;
    }

    const token = middleware.generateTokenUser(user.id);
    response.status(200).json({ token });
  } catch (error) {
    fs.appendFileSync('./server.log', `${error}\n`);
    response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export async function companyRegister(request: CompanyRequest, response: Response): Promise<void> {
  try {
    const { name, type, email, phone_number, login, password } = request.body;
    if (!name || !type || !email || !phone_number || !login || !password) {
      response.status(400).json({ error: 'Invalid data' });
      return;
    }

    const instanceCompany = await models.Company.findOne({ where: { email } });
    if (instanceCompany) {
      response.status(400).json({ error: 'Data is used' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedCompany = await models.Company.create({
      name,
      type,
      email,
      phone_number,
      login,
      password: hashedPassword,
    });

    response.status(201).json(savedCompany);
  } catch (error) {
    fs.appendFileSync('./server.log', `${error}\n`);
    response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export async function companyLogin(request: CompanyRequest, response: Response): Promise<void> {
  try {
    const { login, password } = request.body;
    if (!login || !password) {
      response.status(400).json({ error: 'Invalid data' });
      return;
    }

    const company = await models.Company.findOne({ where: { login }, raw: true });
    if (!company) {
      response.status(401).json({ error: 'Invalid data' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, company.password);
    if (!passwordMatch) {
      response.status(401).json({ error: 'Invalid data' });
      return;
    }

    const token = middleware.generateTokenCompany(company.id);
    response.status(200).json({ token });
  } catch (error) {
    fs.appendFileSync('./server.log', `${error}\n`);
    response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
