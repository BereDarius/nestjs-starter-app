'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-a31a852ab3a4106e3eaaa9be2efffa27599f5c69e6b43aa7cee33ed1a3d1aa480b93d908108c5ed29dbfe652ec2a802f7eb9cc7c972ef55c389edd93c7fbcae1"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-a31a852ab3a4106e3eaaa9be2efffa27599f5c69e6b43aa7cee33ed1a3d1aa480b93d908108c5ed29dbfe652ec2a802f7eb9cc7c972ef55c389edd93c7fbcae1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-a31a852ab3a4106e3eaaa9be2efffa27599f5c69e6b43aa7cee33ed1a3d1aa480b93d908108c5ed29dbfe652ec2a802f7eb9cc7c972ef55c389edd93c7fbcae1"' :
                                            'id="xs-controllers-links-module-AdminModule-a31a852ab3a4106e3eaaa9be2efffa27599f5c69e6b43aa7cee33ed1a3d1aa480b93d908108c5ed29dbfe652ec2a802f7eb9cc7c972ef55c389edd93c7fbcae1"' }>
                                            <li class="link">
                                                <a href="controllers/AdminTodosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminTodosController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AdminUsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminUsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' :
                                            'id="xs-controllers-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' :
                                        'id="xs-injectables-links-module-AuthModule-87b366fb6c0fe8c3c573aa9de600d5be2af4cd75e9986a525489e31d465e979c21c4bce124d605969c9f5d01030e024cd1f5b828da4d5f423069c68982e883e6"' }>
                                        <li class="link">
                                            <a href="injectables/AccessContorlService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessContorlService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseConfigModule.html" data-type="entity-link" >DatabaseConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-4514ecd3e0085acf2a789fa549341cdcd15bf58f2f6eb277523b84c3e62cb141a6d7effb5672668de1c41c055e393630110a1d62e398d48798d1d6832f0b9310"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-4514ecd3e0085acf2a789fa549341cdcd15bf58f2f6eb277523b84c3e62cb141a6d7effb5672668de1c41c055e393630110a1d62e398d48798d1d6832f0b9310"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-4514ecd3e0085acf2a789fa549341cdcd15bf58f2f6eb277523b84c3e62cb141a6d7effb5672668de1c41c055e393630110a1d62e398d48798d1d6832f0b9310"' :
                                            'id="xs-controllers-links-module-HealthModule-4514ecd3e0085acf2a789fa549341cdcd15bf58f2f6eb277523b84c3e62cb141a6d7effb5672668de1c41c055e393630110a1d62e398d48798d1d6832f0b9310"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TodosModule.html" data-type="entity-link" >TodosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' : 'data-bs-target="#xs-controllers-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' :
                                            'id="xs-controllers-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' }>
                                            <li class="link">
                                                <a href="controllers/TodosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' : 'data-bs-target="#xs-injectables-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' :
                                        'id="xs-injectables-links-module-TodosModule-a18a2ca26d1a653b6b58d3f36c7519f5a40f3b81cd0ffe6ceb776471655dcb4b0aaa52796e030c2afaa5a9b23fc62dbedca2d499bb82b18d3f6549c7356524c5"' }>
                                        <li class="link">
                                            <a href="injectables/TodosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-6205abd394eab352e90704bb9666cd0c4dc63c2fe3e7ff3765ffc043e693ac64b92b45ecf9fa0d7ecaf15793c52d823bad1435c4dac166f376c32ddcc04eb5e2"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-6205abd394eab352e90704bb9666cd0c4dc63c2fe3e7ff3765ffc043e693ac64b92b45ecf9fa0d7ecaf15793c52d823bad1435c4dac166f376c32ddcc04eb5e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-6205abd394eab352e90704bb9666cd0c4dc63c2fe3e7ff3765ffc043e693ac64b92b45ecf9fa0d7ecaf15793c52d823bad1435c4dac166f376c32ddcc04eb5e2"' :
                                        'id="xs-injectables-links-module-UsersModule-6205abd394eab352e90704bb9666cd0c4dc63c2fe3e7ff3765ffc043e693ac64b92b45ecf9fa0d7ecaf15793c52d823bad1435c4dac166f376c32ddcc04eb5e2"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Roles.html" data-type="entity-link" >Roles</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Todos.html" data-type="entity-link" >Todos</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TodoStatus.html" data-type="entity-link" >TodoStatus</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Users.html" data-type="entity-link" >Users</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateTodoDto.html" data-type="entity-link" >CreateTodoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryTodoDto.html" data-type="entity-link" >QueryTodoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryUserDto.html" data-type="entity-link" >QueryUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDto.html" data-type="entity-link" >TokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTodoDto.html" data-type="entity-link" >UpdateTodoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalGuard.html" data-type="entity-link" >LocalGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestLoggerMiddleware.html" data-type="entity-link" >RequestLoggerMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IsAuthorizedParams.html" data-type="entity-link" >IsAuthorizedParams</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});