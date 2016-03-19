<template>
	<div class="menu-btn">
	  <ul class="itens" :class="{'open': isOpen, 'hidden': !isOpen}">
	    <li>
	    <a v-link="{name: 'archive', params: {archive: 'webpack'}}">
	      <img @click="isOpen=!isOpen" :src="$route.setting.webpack" alt="webpack" class="btn-menu item-3">
	    </a>
	    </li>
	    <li>
	    	<a v-link="{name: 'archive', params: {archive: 'es6'}}">
	    		<img @click="isOpen=!isOpen" :src="$route.setting.es6" alt="es6" class="btn-menu item-2">
	    	</a>
	    </li>
	    <li>
	    	<a v-link="{name: 'archive', params: {archive: 'sass'}}">
	        <img @click="isOpen=!isOpen" :src="$route.setting.sass" alt="sass" class="btn-menu item-1">
	      </a>
	    </li>
	    <li>
	    	<a v-link="{name: 'archive', params: {archive: 'vuejs'}}">
	        <img @click="isOpen=!isOpen" :src="$route.setting.vuejs" alt="vuejs" class="btn-menu item-4">
	      </a>
	    </li>
	  </ul>
	  <div class="open-menu" @click="isOpen=!isOpen">
	      <img :src="$route.setting.me" alt="me" class="mePng btn-menu">
	  </div>
	</div>	
</template>

<script>
	export default {
		name: 'MenuButton',
		data () {
	    return {
	    	isOpen: false
	    }
		}
	}
</script>

<style lang="sass">
	@mixin material-shadow($level: 1){
	  @if $level == 1 {
	    box-shadow: 0 1px 3px rgba(0,0,0,0.12),
	    						0 1px 2px rgba(0,0,0,0.24);
	  }
	  @if $level == 2 {
	    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 
	    						0 3px 6px rgba(0,0,0,0.23);
	  }
	  @if $level == 3 {
	    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 
	    						0 6px 6px rgba(0,0,0,0.23);
	  }
	  @if $level == 4 {
	    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
	    						0 10px 10px rgba(0,0,0,0.22);
	  }
	  @if $level == 5 {
	  	box-shadow: 0 19px 38px rgba(0,0,0,0.30), 
	  							0 15px 12px rgba(0,0,0,0.22);
	  }
	}

	@function makelongshadow($color) {
		$val: 0px 0px $color;
		$shadowlength: 5;
		@for $i from 1 through $shadowlength {
	  	$val: #{$val}, #{$i}px #{$i}px #{$color};
		}
		@return $val;
	}
	
	@mixin longshadow($color) {
		text-shadow: makelongshadow($color);
	}

	.menu-btn{
	  position: fixed;
	  bottom: .5rem;
	  right: .5rem;
	  z-index: 20;

	  .mePng {
	  	display: inline-block;
	  	width: 2.8rem;
	  	height: 2.8rem;
	  	border-radius: 50%;
	  }
	  
	  %btn{
	    position: relative;
	    cursor: pointer;
	    border-radius: 50%;
	    color: white;
	    line-height: 1;
	    outline: 0;
	    border: 0;
	    margin-top: .5rem;
	    &:hover {
	      @include material-shadow(3);
	    }
	    &:active {
	      @include material-shadow(3);
	    }
	  }
	  
	  ul.itens{
	    list-style: none;
	    text-decoration: none;
	    text-align: center;
	    position: relative;
	    display: inline-block;
	    padding: 0;
	    a {
	    	display: inline-block;
	    }
	    .btn-menu{
	      @extend %btn;
	      width: 2.8rem;
	      height: 2.8rem;
	      overflow: hidden;
				.mePng {
					display: inline-block;
					width: 2.8rem;
					height: 2.8rem;
				}

	      &.item-1{
	        background-color: #3B5998;
	        i{
	          @include longshadow(darken(#3B5998, 15%));
	        }
	      }
	      &.item-2{
	        background-color: #E91E63;
	        i{
	          @include longshadow(darken(#E91E63, 15%));
	        }
	      }
	      &.item-3{
	        background-color: #FFC107;
	        i{
	          @include longshadow(darken(#FFC107, 15%));
	        }
	      }
	      &.item-4{
	        background-color: #FF5F00;
	        i{
	          @include longshadow(darken(#FFC107, 15%));
	        }
	      }
	    }
	    &.open .btn-menu{
	      transform: scale(1);
	      opacity: 1;
	    }
	    li{
	      position: relative;
	      .btn-menu{
	        transform: scale(0);
	        opacity: 0;
	      }
	      .btn-menu-text{
	        position: absolute;
	        bottom: 15px;
	        right: 100%;
	        margin-right: 10px;
	        min-width: 75px;
	        border-radius: 2px;
	        padding: 3px 4px;
	        text-align: center;
	        font-weight: 300;
	        background: transparent;
	        display: block;
	        opacity: 0;
	      }
	      &:hover .btn-menu-text{
	        opacity: 1;
	      }
	    }
	  }
	 
	  div.open-menu{
	    .btn-menu{
	      @extend %btn;
	      width: 2.8rem;
	      height: 2.8rem;
	      background-color: transparent;
	      i{
	        @include longshadow(darken(#F44336, 5%));
	      }
	    }
	  }
	  
	  $menu-items: 4;
	  $i: 1;
	  @while $i <= $menu-items {
		  .itens.open .item-#{$i}, .itens.open .item-#{$i} .btn-menu-text { 
		  	transition: all 200ms cubic-bezier(0.680, -0.550, 0.265, 1.550) $i*0.1s; 
		  }

		  .itens.hidden .item-#{$i}, .itens.open .item-#{$i} .btn-menu-text {
		    transition: all 100ms cubic-bezier(0.680, -0.550, 0.265, 1.550) ($menu-items - $i + 1)*0.1s; 
		    z-index: -2;
		  }
	    
	   	$i: $i + 1;
	  }
	}

</style>