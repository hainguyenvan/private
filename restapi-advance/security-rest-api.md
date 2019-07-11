# Security Rest API
| Solutions bảo mật api with api key

## API key
* API key được tạo bằng cách hash: timestmap + payload, để api key luôn luôn là một số biến đổi

## Solutions
* Khi người dùng đăng nhập vào hệ thống sẽ được hệ thống cấp cho một: public key để có thể tạo ra được api key.
* Request gửi đến server, server sẽ decript chỗi hash để lấy ra timestamp và hash nếu thỏa mãn thì mới xử lý còn không sẽ reject request.
* Với solutions trên thì có 2 vần đã được giải quyết:
    * Tại một thời điểm thì chỉ có duy nhất một api key với một api
    * Nếu để mất public key, hacker cũng không thể  biết được quy tắc hash và từ đó cũng không thể gọi được api.

## Implements
* Chạy file rsa/rsa.js để tạo public key, private key, public key sẽ gửi đến client
* Install
```
crypto
bcrypt với SALT_ROUNDS: 10
```
* crypto đễ tạo api key
* Thiết lập bcrypt với rounds 10 ở client để tạo  secret key
* api key gồm có: timestamp + bcrypt_hash(hash payload + timestamp);

## Example
* Trong project này chúng ta implements solutions ở trong file auth-api.js
* Có sử graphql để hỗ trợ query data, client muỗn gọi được graphql cần có api key graphql. Hiện tại cấu hình này ở trong file gql-client.js và middlewares của nó là file graphql.js