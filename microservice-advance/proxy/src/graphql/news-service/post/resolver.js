const PostType = {
    async accountInfo(root, args, context, info) {
        console.log(context);
        const id1 = '5e9f9852-3bb0-4ed1-a4f4-812dbbb49ebd';
        // const { id } = await context.getAccountsById(id1);
        console.log('fuck: ', context);
        console.log('test=====================');
        return 'Test 101';
    },
};

module.exports = {
    PostType,
};