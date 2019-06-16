import React from 'react';
import Joi from '@hapi/joi';

export function validValidator(value) {
  return null
}

export function usernameValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().min(5) },
  )
  if (result.error !== null) {
    const type = result.error.details[0].type
    switch (type) {
      case 'string.base': 
        return 'Sai kiểu dữ liệu'
      case 'any.empty':
        return 'Không được để trống'
      case 'string.min':
        return 'Tối thiểu 5 kí tự'
      default:
        return 'Lỗi'
    }
  } else {
    return null
  }
}

export function emailValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().email() },
  )
  if (result.error !== null) {
    const type = result.error.details[0].type
    switch (type) {
      case 'string.base': 
        return 'Sai kiểu dữ liệu'
      case 'any.empty':
        return 'Không được để trống'
      case 'string.email':
        return 'Email không hợp lệ'
      default:
        return 'Lỗi'
    }
  } else {
    return null
  }
}

export function phoneValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().regex(/^[0-9]+$/) },
  )
  if (result.error !== null) {
    const type = result.error.details[0].type
    switch (type) {
      case 'string.base': 
        return 'Sai kiểu dữ liệu'
      case 'any.empty':
        return 'Không được để trống'
      case 'string.regex.base':
        return 'Số điện thoại không hợp lệ'
      default:
        return 'Lỗi'
    }
  } else {
    return null
  }
}

export function notEmptyStringValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string() },
  )
  if (result.error !== null) {
    const type = result.error.details[0].type
    switch (type) {
      case 'string.base': 
        return 'Sai kiểu dữ liệu'
      case 'any.empty':
        return 'Không được để trống'
      default:
        return 'Lỗi'
    }
  } else {
    return null
  }
} 

export function emptyStringValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().allow('') },
  )
  if (result.error !== null) {
    const type = result.error.details[0].type
    switch (type) {
      case 'string.base': 
        return 'Sai kiểu dữ liệu'
      case 'any.empty':
        return 'Không được để trống'
      default:
        return 'Lỗi'
    }
  } else {
    return null
  }
}

export function passwordValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().min(8).regex(/^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/) },
  )
  if (result.error !== null) {
    const type = result.error.details[0].type
    switch (type) {
      case 'string.base': 
        return 'Sai kiểu dữ liệu'
      case 'any.empty':
        return 'Không được để trống'
      case 'string.min':
        return 'Tối thiểu 8 kí tự'
      case 'string.regex.base':
        return 'Mật khẩu cần ít nhất 1 ký tự thường, 1 ký tự hoa, 1 ký tự số, 1 ký tự đặc biệt'
      default:
        return 'Lỗi'
    }
  } else {
    return null
  }
}

export default function useValidState(_value, validator = validValidator) {
  const [value, setValue] = React.useState(_value)
  const error = validator(value)
  return [value, error, setValue]
}