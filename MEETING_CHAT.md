# Zapis chatu

## dzień 1

09:32:56	 From  Sages Trener14 : http://latentflip.com/loupe/
09:33:04	 From  Sages Trener14 : https://get.myflow.pl/slides/ng/#/5
09:37:24	 From  Sages Trener14 : https://get.myflow.pl/ng/instalki/#/
09:38:39	 From  Sages Trener14 : branch: 201116-ng
15:19:48	 From  Sages Trener14 : ng generate @schematics/angular:module --name=home --project=web --module=app.module.ts --routing
16:18:31	 From  Sages Trener14 : ng generate @schematics/angular:component --name=home/pages/contact --project=web --style=scss --type=Page

## dzień 2

11:31:47	 From  Sages Trener14 : ng generate @schematics/angular:pipe --name=home/pipes/contactPhotoUrl
11:33:36	 From  Sages Trener14 : https://randomuser.me/api/portraits/men/1.jpg
12:49:36	 From  Sages Trener14 : ng generate @schematics/angular:component --name=home/pages/contact-details --style=scss --type=Page
14:07:52	 From  Sages Trener14 : ng generate @schematics/angular:service --name=home/services/contact

## dzień 4

12:26:48	 From  Sages Trener14 : ng add @angular/material
12:35:47	 From  Sages Trener14 : ng generate @angular/material:navigation --name=home/components/layout
12:47:58	 From  Sages Trener14 : ng generate @schematics/angular:module --name=user --routing 
12:50:33	 From  Sages Trener14 : ng generate @schematics/angular:service --name=user/services/user
12:50:44	 From  Sages Trener14 : ng generate @schematics/angular:service --name=user/services/auth
12:51:59	 From  Sages Trener14 : ng generate @schematics/angular:component --name=user/dialogs/auth --style=scss --type=Dialog
12:55:37	 From  Sages Trener14 : ng generate @schematics/angular:directive --name=user/directives/auth
14:59:20	 From  Sages Trener14 : npm i jwt-decode
15:25:06	 From  Sages Trener14 : ng generate @schematics/angular:interceptor --name=user/interceptors/auth
16:01:09	 From  Sages Trener14 : ng generate @schematics/angular:service --name=user/services/user-storage

## dzień 5

09:13:20	 From  Sages Trener14 : ng generate @schematics/angular:directive --name=home/directives/light
09:39:20	 From  Sages Trener14 : ng generate @schematics/angular:directive --name=home/directives/img-error
10:35:28	 From  Sages Trener14 : ng generate @schematics/angular:directive --name=home/directives/unless
10:35:38	 From  Sages Trener14 : ng generate @schematics/angular:directive --name=user/directives/user
11:17:12	 From  Sages Trener14 : https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
11:27:33	 From  Sages Trener14 : ng add @ngrx/schematics
11:29:31	 From  Sages Trener14 : npm i @ngrx/store-devtools
11:36:08	 From  Sages Trener14 : npm i @ngrx/store
12:08:51	 From  Sages Trener14 : ng generate @ngrx/schematics:store --root --stateInterface=AppState --module=app.module.ts
11:48:07	 From  Sages Trener14 : ng generate @ngrx/schematics:reducer --name=home/+contacts/contacts --reducers=../../reducers/index.ts
12:13:25	 From  Sages Trener14 : ng generate @ngrx/schematics:action --name=home/+contacts/contacts
12:43:17	 From  Sages Trener14 : ng generate @ngrx/schematics:selector --name=home/+contacts/contacts
14:07:30	 From  Sages Trener14 : ng add @ngrx/effects
14:11:51	 From  Sages Trener14 : ng generate @ngrx/schematics:effect --name=home/+contacts/contacts --module=home/home.module.ts
16:25:14	 From  Sages Trener14 : ng generate @schematics/angular:module --name=music --module=app.module.ts --route=music --routing
16:35:35	 From  Sages Trener14 : ng generate @ngrx/schematics:store --name=music/music --module=music.module.ts --stateInterface=MusicState
16:38:55	 From  Sages Trener14 : ng generate @ngrx/schematics:reducer --name=music/+artist/artist --api --reducers=../reducers/index.ts
16:48:37	 From  Sages Trener14 : ng generate @ngrx/schematics:feature --name=music/+song/song --module=music/music.module.ts --reducers=../reducers/index.ts
