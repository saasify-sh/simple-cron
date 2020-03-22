/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CronJobController } from './cron';
import * as KoaRouter from 'koa-router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  "HttpHeaders": {
    "dataType": "refObject",
    "properties": {
    },
    "additionalProperties": { "dataType": "string" },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "HttpBody": {
    "dataType": "refObject",
    "properties": {
    },
    "additionalProperties": { "dataType": "any" },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "HttpQuery": {
    "dataType": "refObject",
    "properties": {
    },
    "additionalProperties": { "dataType": "string" },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "HttpStatus": {
    "dataType": "refObject",
    "properties": {
      "code": { "dataType": "double" },
      "message": { "dataType": "string" },
    },
    "additionalProperties": true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "CronJob": {
    "dataType": "refObject",
    "properties": {
      "id": { "dataType": "string", "required": true },
      "userId": { "dataType": "string", "required": true },
      "createdAt": { "dataType": "datetime", "required": true },
      "updatedAt": { "dataType": "datetime", "required": true },
      "schedule": { "dataType": "string", "required": true },
      "timezone": { "dataType": "string", "required": true },
      "url": { "dataType": "string", "required": true },
      "httpMethod": { "dataType": "enum", "enums": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"], "required": true },
      "httpHeaders": { "ref": "HttpHeaders", "required": true },
      "httpBody": { "ref": "HttpBody", "required": true },
      "httpQuery": { "ref": "HttpQuery", "required": true },
      "name": { "dataType": "string", "required": true },
      "description": { "dataType": "string", "required": true },
      "tags": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
      "state": { "dataType": "enum", "enums": ["enabled", "disabled", "paused"], "required": true },
      "lastAttemptTime": { "dataType": "datetime" },
      "nextAttemptTime": { "dataType": "datetime" },
      "status": { "ref": "HttpStatus" },
    },
    "additionalProperties": true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "CronJobCreateRequest": {
    "dataType": "refObject",
    "properties": {
      "schedule": { "dataType": "string", "required": true },
      "timezone": { "dataType": "string" },
      "url": { "dataType": "string", "required": true },
      "httpMethod": { "dataType": "enum", "enums": ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"] },
      "httpHeaders": { "ref": "HttpHeaders" },
      "httpBody": { "ref": "HttpBody" },
      "httpQuery": { "ref": "HttpQuery" },
      "name": { "dataType": "string" },
      "description": { "dataType": "string" },
      "tags": { "dataType": "array", "array": { "dataType": "string" } },
    },
    "additionalProperties": true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "CronJobUpdateRequest": {
    "dataType": "refObject",
    "properties": {
      "state": { "dataType": "enum", "enums": ["enabled", "disabled", "paused"], "required": true },
    },
    "additionalProperties": true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  router.post('/jobs',
    async (context: any, next: any) => {
      const args = {
        body: { "in": "body", "name": "body", "required": true, "ref": "CronJobCreateRequest" },
        userId: { "in": "header", "name": "x-saasify-user", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new CronJobController();

      const promise = controller.createJob.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get('/jobs/:jobId',
    async (context: any, next: any) => {
      const args = {
        jobId: { "in": "path", "name": "jobId", "required": true, "dataType": "string" },
        userId: { "in": "header", "name": "x-saasify-user", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new CronJobController();

      const promise = controller.getJob.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.delete('/jobs/:jobId',
    async (context: any, next: any) => {
      const args = {
        jobId: { "in": "path", "name": "jobId", "required": true, "dataType": "string" },
        userId: { "in": "header", "name": "x-saasify-user", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new CronJobController();

      const promise = controller.removeJob.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get('/jobs',
    async (context: any, next: any) => {
      const args = {
        offset: { "default": 0, "in": "query", "name": "offset", "dataType": "double" },
        limit: { "default": 100, "in": "query", "name": "limit", "dataType": "double" },
        userId: { "in": "header", "name": "x-saasify-user", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new CronJobController();

      const promise = controller.listJobs.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.put('/jobs/:jobId',
    async (context: any, next: any) => {
      const args = {
        jobId: { "in": "path", "name": "jobId", "required": true, "dataType": "string" },
        body: { "in": "body", "name": "body", "required": true, "ref": "CronJobUpdateRequest" },
        userId: { "in": "header", "name": "x-saasify-user", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, context);
      } catch (error) {
        context.status = error.status;
        context.throw(error.status, JSON.stringify({ fields: error.fields }));
      }

      const controller = new CronJobController();

      const promise = controller.updateJob.apply(controller, validatedArgs as any);
      return promiseHandler(controller, promise, context, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
    return Promise.resolve(promise)
      .then((data: any) => {
        if (data || data === false) {
          context.body = data;
          context.status = 200;
        } else {
          context.status = 204;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            context.set(name, headers[name]);
          });

          const statusCode = controllerObj.getStatus();
          if (statusCode) {
            context.status = statusCode;
          }
        }
        return next();
      })
      .catch((error: any) => {
        context.status = error.status || 500;
        context.throw(context.status, error.message, error);
      });
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, context: any): any[] {
    const errorFields: FieldErrors = {};
    const values = Object.keys(args).map(key => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return context.request;
        case 'query':
          return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, { "specVersion": 3 });
        case 'path':
          return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, { "specVersion": 3 });
        case 'header':
          return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, { "specVersion": 3 });
        case 'body':
          return validationService.ValidateParam(args[key], context.request.body, name, errorFields, name + '.', { "specVersion": 3 });
        case 'body-prop':
          return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', { "specVersion": 3 });
      }
    });
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
