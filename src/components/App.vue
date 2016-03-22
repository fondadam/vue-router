<template>
	<header>
		<h1>
		  <a v-link="{ path: '/home' }">{{$route.setting.blogTitle}}</a>
		</h1>
		<ul>
			<li class="github">
			  <a href="http://github.com/fondadam">
			    <img :src="$route.setting.github" alt="github">
			  </a>
			</li>
			<li class="weibo">
			  <a href="http://weibo.com/fonda35">
			  	<img :src="$route.setting.weibo" alt="weibo">
			  </a>
			</li>
			<li class="rss">
			  <a href="http://blog.fondadam.cn">
					<img :src="$route.setting.rss" alt="rss">
			  </a>
			</li>
		</ul>
	</header>
	
	<router-view
	    class="view"
	    keep-alive
	    transition  
	    transition-mode="in-out">
	</router-view>

	<menu-button></menu-button>

</template>



<script>

	import Vue from 'vue';
	import MenuButton from './MenuButton.vue';

	Vue.component('menu-button', MenuButton);

</script>

<style lang="sass">
	// normal
	html,body {
		font: 16px/16px "Microsoft YaHei";
		background-color: #FFF;
	}
	body {
		max-width: 618px;
		margin: 0 auto;
		padding: 1.1rem;
		color: #333;
		position: relative;
	}
	h1,h2,h3,h4,h5,h6 {
		margin: 0;
		padding: 0;
	}
	a,li,img,button,input {
		-webkit-tap-highlight-color:rgba(255,0,0,0)!important;
	}
	h1 {
		font-weight: 500;
	}
	a {
		text-decoration: none;
		color: #444;
	}
	// App.vue
	header {
		text-align: center;
		font-size: 1rem;
		h1 {
			line-height: 1rem;
			a{
				color: #555;
			}
		}
		ul {
			list-style: none;
			padding: 0;
			li {
				display: inline-block;
				margin: .5rem;
				text-align: center;
				img {
					width: 1.1rem;
					height: 1.1rem;
					padding: .2rem;
					background-color: #DDD;
					border-radius: 50%;
				}
			}
		}
	}

</style>