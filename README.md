리덕스 개념을 쉽고 빠르게 익혀봅시다👀

생활코딩 Egoing Lee 님의 [Redux 강좌](https://www.inflearn.com/course/redux-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9/dashboard)를 들으며 정리한 내용입니다 :-)

### **Redux란 ?**

A predictable state container for Javascript apps

**예측 가능한 predictable**

눈에 보이지 않는 복잡성은 위험 요소 !! → 코드의 복잡성을 줄이는 것이 우리의 목표

리덕스는 코드의 복잡성을 줄여서 코드의 결과를 예측 가능하게 하는 툴

Single State of Truth

한 곳의 State에 어플리케이션에 필요한 모든 정보를 모아놓아서 복잡성을 1차적으로 감소시킨다. 

직접 State를 바꾸지 못하고, dispatcher 혹은 reducer등을 사용해야만 바꿀수 있게 삼엄하게 관리

데이터를 쉽게 가져가지 못하도록 보호

State가 바뀔 때마다 그 state를 사용하는 어플리케이션들에게 연락(?)하여 변화에 적응하도록

각각의 state의 변화가 독립적이다 → undo, redo를 사용하여 state를 쉽게 관리할 수 있음

견고하면서도 유연한 어플리케이션을 만들 수 있음

### 리덕스 여행의 지도

html, css, redux 만 사용하여 CRD가 가능한 웹페이지 만들어볼 예정 !

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a68ce58-0e93-40f4-92d9-f3dc031e6857/_2020-09-21__4.00.03.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a68ce58-0e93-40f4-92d9-f3dc031e6857/_2020-09-21__4.00.03.png)

리덕스의 핵심은 **store** 

: 정보가 저장되는 곳 ! 비유적으로 은행이라 생각해도 좋아요

**state**

: 실제 정보 , 직접 접근하는 것은 절대적으로 금지되어 있음

**reducer**

: state를 만들 때에 이 함수를 만들어 공급해주어야 함

```jsx
function reducer(oldState, action){
//...
}
var store = Redux.createStore(reducer);
```

**render**

: 리덕스와는 상관없는, UI를 만들어 줄 역할을 하는 우리의 코드

```jsx
function render(){
	var state = store.getState();
	// ...
	document.querySelector('#app').innerHTML = `
		<h1>WEB</h1>
		....
	`
}
```

**dispatch, subscribe, getState**

우리가 state에 직접 접근하지 못하므로 사용하는 함수

subscribe

: render함수를 subscribe에 등록하여 state값이 바뀔 때마다 render함수가 호출 되어 UI 가 새롭게 갱신된다. (오🤩)

```jsx
store.subscribe(render);
```

**action**

```jsx
<form onsubmit="
	//...
	store.dispatch({type:'create',payload:{title:title,desc:desc}});
">
```

dispatch에 action을 담아요

**dispatch**

: 얘가 하는 일은..

1. reducer를 호출하여 state값 바꾼다

```jsx
function reducer(state,action){
	if(action.type === 'create'){
		var newContents = oldState.contents.concat();
		var newMaxId = oldState.maxId+1;
		newContents.push({id:newMaxId, title:action.payload.title})
		return Object.assign({}, state, {
			contents:newContents,
			maxId:newMaxId,
			mode:'read',
			selectedId:newMaxId
		});
...
```

새로운 state 값을 return해주는 state의 가공자 역할

2. subscribe에 등록된 모든 구독자를 호출하여 render함수 호출하여 화면 갱신 → 새로운 state에 맞도록 UI가 바뀐다

### Redux를 쓰는 이유는 무엇일까 ?

1. 중앙집중적인 store를 이용하여 어플리케이션을 편하게 개발할 수 있다
2. 어플리케이션의 state에 대한 버전 관리가 가능

## Redux의 적용

**Redux를 사용하지 않을 때의 코드**

`without-redux.html`

```html
<html>
    <body>
        <style>
            .container{
                border:5px solid black;
                padding:10px;
            }
        </style>
        <div id="red"></div>
        <div id="green"></div>
        <div id="blue"></div>
        <script>
            function red(){
                document.querySelector('#red').innerHTML =  `
                    <div class="container" id="component_red">
                        <h1>red</h1>
                        <input type="button" value="fire" onclick="
                        document.querySelector('#component_red').style.backgroundColor = 'red';
                        document.querySelector( '#component_green').style.backgroundColor = 'red';
                        document.querySelector('#component_blue').style.backgroundColor = 'red';
                        ">
                    </div>
                `;
            }
            function green(){
                document.querySelector('#green').innerHTML =  `
                    <div class="container" id="component_green">
	                        <h1>green</h1>
	                        <input type="button" value="fire" onclick="
                        document.querySelector('#component_green').style.backgroundColor = 'green';
                        document.querySelector('#component_red').style.backgroundColor = 'green';
                        document.querySelector('#component_blue').style.backgroundColor = 'green';
                        ">
                    </div>
                `;
            }
            function blue(){
                document.querySelector('#blue').innerHTML =  `
                    <div class="container" id="component_blue">
                        <h1>blue</h1>
                        <input type="button" value="fire" onclick="
                        document.querySelector('#component_green').style.backgroundColor = 'blue';
                        document.querySelector('#component_blue').style.backgroundColor = 'blue';
                        document.querySelector('#component_red').style.backgroundColor = 'blue';
                        ">
                    </div>
                `;
            }
            red();
            green();
            blue();
        </script>
    </body>
</html>
```

**Store 생성**

`with-redux.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <!--redux cdn 코드를 복사 붙여넣기하여 리덕스를 가져온다-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.js"></script>
    </head>
    <body>
        <style>
            .container {
                border:5px solid black;
                padding:10px;
            }
        </style>
        <div id="red"></div>
        <script>
            //reducer 함수 생성
            function reducer(state, action){
                if(state === undefined){
                    return {color:'yellow'}
                }

            }
            // createStore로 store를 만들면 내부적으로 state가 생기고, 이를 가져오기 위해서는 getState를 사용한다.
            var store = Redux.createStore(reducer);
            console.log(store.getState());
            function red(){
                //store에 getState를 하여 state를 가져옴
                var state = store.getState();
                document.querySelector('#red').innerHTML =  `
                    <div class="container" id="component_red" style="background-color:${state.color}" >
                        <h1>red</h1>
                        <input type="button" value="fire" onclick="
                        document.querySelector('#component_red').style.backgroundColor = 'red';
                        document.querySelector( '#component_green').style.backgroundColor = 'red';
                        document.querySelector('#component_blue').style.backgroundColor = 'red';
                        ">
                    </div>
                `;
            }
            red();
        </script>
    </body>
</html>
```

위 코드로 store를 생성하고, 초기 색상을 지정

**reducer와 action을 이용하여 새로운 state 값 만들기**

`with-redux.html`

```jsx
<!DOCTYPE html>
<html>
    <head>
        <!--redux cdn 코드를 복사 붙여넣기하여 리덕스를 가져온다-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.js"></script>
    </head>
    <body>
        <style>
            .container {
                border:5px solid black;
                padding:10px;
            }
        </style>
        <div id="red"></div>
        <script>
           ...
        </script>
    </body>
</html>
```

```jsx
...

            //reducer 함수 생성
            function reducer(state, action){
                console.log(state,action);
                if(state === undefined){
                    return {color:'yellow'}
                }
                var newState;
                if(action.type === 'CHANGE-COLOR'){
                    //state를 복제하고, 복제한 객체의 color를 red로 변경한다
                    newState = Object.assign({}, state, {color:'red'})
                }
                return newState;
            }
            // createStore로 store를 만들면 내부적으로 state가 생기고, 이를 가져오기 위해서는 getState를 사용한다.
            var store = Redux.createStore(reducer);
            function red(){
                //store에 getState를 하여 state를 가져옴
                var state = store.getState();
                document.querySelector('#red').innerHTML =  `
                    <div class="container" id="component_red" style="background-color:${state.color}" >
                        <h1>red</h1>
                        <input type="button" value="fire" onclick="
                        store.dispatch({type:'CHANGE-COLOR', color:'red'});
                        ">
                    </div>
                `;
            }
            red();
...
```

- reducer는 현재 state와 action을 인자로 받아서, 다음 state를 return 해준다.
- reducer 함수 내부에서는 원본 state를  직접 변경하기 보다는, state를 복제하고 복제한 state를 변경하는 것이 좋다
- dispatch 함수

**state의 변화에 따라서 UI 반영하기**

state 값이 바뀔 때마다 render를 호출해야한다.

`with-redux.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <!--redux cdn 코드를 복사 붙여넣기하여 리덕스를 가져온다-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.js"></script>
    </head>
    <body>
        <style>
            .container {
                border:5px solid black;
                padding:10px;
            }
        </style>
        <div id="red"></div>
        <div id="blue"></div>
        <div id="green"></div>
        <script>
            ...
        </script>
    </body>
</html>
```

```jsx

            //reducer 함수 생성
            function reducer(state, action){
                console.log(state,action);
                if(state === undefined){
                    return {color:'yellow'}
                }
                var newState;
                if(action.type === 'CHANGE-COLOR'){
                    //state를 복제하고, 복제한 객체의 color를 red로 변경한다
                    newState = Object.assign({}, state, {color:action.color})
                }
                return newState;
            }
            // createStore로 store를 만들면 내부적으로 state가 생기고, 이를 가져오기 위해서는 getState를 사용한다.
            var store = Redux.createStore(reducer);
            //state 값이 바뀔 때마다 호출해도 되는 함수
            function red(){
                //store에 getState를 하여 state를 가져옴
                var state = store.getState();
                document.querySelector('#red').innerHTML =  `
                    <div class="container" id="component_red" style="background-color:${state.color}" >
                        <h1>red</h1>
                        <input type="button" value="fire" onclick="
                        store.dispatch({type:'CHANGE-COLOR', color:'red'});
                        ">
                    </div>
                `;
            }
            //state값이 바뀔 때마다 red 함수가 호출된다
            store.subscribe(red);
            red();
             //state 값이 바뀔 때마다 호출해도 되는 함수
            function blue(){
                //store에 getState를 하여 state를 가져옴
                var state = store.getState();
                document.querySelector('#blue').innerHTML =  `
                    <div class="container" id="component_red" style="background-color:${state.color}" >
                        <h1>blue</h1>
                        <input type="button" value="fire" onclick="
                        store.dispatch({type:'CHANGE-COLOR', color:'blue'});
                        ">
                    </div>
                `;
            }
            //state값이 바뀔 때마다 blue 함수가 호출된다
            store.subscribe(blue);
            blue();
            //state 값이 바뀔 때마다 호출해도 되는 함수
            function green(){
                //store에 getState를 하여 state를 가져옴
                var state = store.getState();
                document.querySelector('#green').innerHTML =  `
                    <div class="container" id="component_red" style="background-color:${state.color}" >
                        <h1>green</h1>
                        <input type="button" value="fire" onclick="
                        store.dispatch({type:'CHANGE-COLOR', color:'green'});
                        ">
                    </div>
                `;
            }
            //state값이 바뀔 때마다 green 함수가 호출된다
            store.subscribe(green);
            green();
```

`green()` 부품은 `red()` 나 `blue()` 라는 컴포넌트를 몰라도 된다 !! 라는 효과를 얻을 수 있다. 

비교해보면, `without-redux.html` 에서는 red, blue 만 있던 상태에서 blue가 추가되었을 때에 red, blue 모두를 변경해야만 했다.

따라서 redux의 장점이라면, 부품의 독립성을 꼽을 수 있다.

**Redux 선물: 시간여행과 로깅**

Redux dev tools 크롬 확장 도구 설치

웹서버 연결을 위해 `app.js` 추가

```jsx
const express = require('express');
const app = express();
const port = 3000;

app.set('views','./views')
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.get('/with-redux',function(req,res){
    res.render('with-redux.html');
})

app.listen(port,() => {
    console.log('connected')
})
```

express 모듈과 ejs 모듈을 npm 이용하여 설치하고, views 폴더에 with-redux.html 파일을 넣는다.

크롬 확장 도구로 살펴보면, fire 버튼을 클릭할 때 마다 CHANGE-COLOR 가 아래 쌓이고, 어떤 색으로 바뀌었는지 명시되는 것을 볼 수 있다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91133d2b-3f26-4610-bb40-b11ce93f3ad6/_2020-10-02__8.45.07.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91133d2b-3f26-4610-bb40-b11ce93f3ad6/_2020-10-02__8.45.07.png)

이를 이용하여 time travel 이 가능함 !!!! 

`json` 형식으로 state에 대한 정보를 다운받고, 새로고침한 상태에서 이를 업로드하면 그 상태로 돌아가는 것을 볼 수 있다.
