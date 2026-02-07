def order_errors(serializer_errors):
    #{'non_field_errors': [ErrorDetail(string='Contraseña incorrecta', code='invalid')]}
    error_messages = []
    for field, messages in serializer_errors.items():
        for message in messages:
            error_messages.append(f"{field}: {message}" if field != 'non_field_errors' else str(message))
    return error_messages