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
  "CronJob": {
    "dataType": "refObject",
    "properties": {
      "id": { "dataType": "string", "required": true },
      "userId": { "dataType": "string", "required": true },
      "cronExpression": { "dataType": "string", "required": true },
      "timezone": { "dataType": "string", "required": true },
      "timeout": { "dataType": "double", "required": true },
      "url": { "dataType": "string", "required": true },
      "httpMethod": { "dataType": "enum", "enums": ["get", "post", "put", "delete", "trace", "patch", "head", "options"], "required": true },
      "httpHeaders": { "ref": "HttpHeaders", "required": true },
      "httpBody": { "ref": "HttpBody", "required": true },
      "httpQuery": { "ref": "HttpQuery", "required": true },
      "name": { "dataType": "string", "required": true },
      "description": { "dataType": "string", "required": true },
      "tags": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
      "status": { "dataType": "enum", "enums": ["enabled", "disabled"], "required": true },
      "numRunsSuccess": { "dataType": "double", "required": true },
      "numRunsFailure": { "dataType": "double", "required": true },
      "createdAt": { "dataType": "datetime", "required": true },
      "updatedAt": { "dataType": "datetime", "required": true },
    },
    "additionalProperties": true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "CronJobCreateRequest": {
    "dataType": "refObject",
    "properties": {
      "cronExpression": { "dataType": "string", "required": true },
      "url": { "dataType": "string", "required": true },
      "timezone": { "dataType": "string", "default": "America/New_York" },
      "timeout": { "dataType": "double", "default": 0 },
      "httpMethod": { "dataType": "enum", "enums": ["get", "post", "put", "delete", "trace", "patch", "head", "options"], "default": "get" },
      "httpHeaders": { "ref": "HttpHeaders", "default": {} },
      "httpBody": { "ref": "HttpBody", "default": {} },
      "httpQuery": { "ref": "HttpQuery", "default": {} },
      "name": { "dataType": "string", "default": "Default" },
      "description": { "dataType": "string", "default": "" },
      "tags": { "dataType": "array", "array": { "dataType": "string" }, "default": [] },
    },
    "additionalProperties": true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "CronJobUpdateRequest": {
    "dataType": "refObject",
    "properties": {
      "status": { "dataType": "enum", "enums": ["enabled", "disabled"], "required": true },
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
