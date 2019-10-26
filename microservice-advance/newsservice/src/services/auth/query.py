class AuthQuery:
    def get_query_validate_token(token):
        query = """
                {
                    validateToken(token: \"""" + token + """") {
                        status
                        msg
                    }
                }
                """
        return query
