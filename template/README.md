# {{ name }}

> {{ description }}

֧�����ַ�ʽ����apps�п�����Ӧ��:

1. ���app��ʹ��plugin����Զ��js

    ```
    npm run apps
    // ���� http://localhost:3000/#!/apps/hello
    ```

1. ֱ��ʹ��vue����ķ�ʽ���� (���㿪��)

    ```
    // ��Ҫ��·������������
    // ���� http://localhost:3000/#!/hello
    '/hello': {
        component: (resolve) => {
            require(['apps/hello/hello'], resolve);
        }
    }
    ```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

# build 3rd party apps
npm run apps

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
