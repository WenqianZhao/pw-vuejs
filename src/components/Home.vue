<template>
  <div class="home">
    <div class="computer">
    	<div class="content">
    		<p>$ {{helloworld}}<span id="mock-cursor">|</span></p>
    		<p>$ {{content}}</p>
    	</div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default {
  data() {
    return {
    	time: 1,
    	language: 1,
    	helloworld: '',
    	content: '',
    };
  },
  methods: {
    printHelloWord: function () {
    	var self = this;
    	var java = 'System.out.println("Hello World! I love Java!") .';
    	var javascript = 'console.log("Hello World! I love JS!") .';
    	var python = 'print("Hello World! I love python!") .';
    	var cpp = 'printf("%s", "Hello World! I love C++!") .';
	  	setTimeout(function cycle(){ 
	  		self.time++;
	  		if (self.language == 1) {
	  			self.time = self.time % java.length;
	  			self.helloworld = java.substr(0, self.time);
	  			if (self.time + 1 == java.length) {
	  				self.language = 2;
	  				self.time = 0;
	  				self.content = 'Hello world! I love Java!';
	  				setTimeout(cycle,1000);
	  			} else {
	  				setTimeout(cycle,getRandomInt(80,300));
	  			}
	  		} else if (self.language == 2) {
	  			self.time = self.time % javascript.length;
	  			self.helloworld = javascript.substr(0, self.time);
	  			if (self.time + 1 == javascript.length) {
	  				self.language = 3;
	  				self.time = 0;
	  				self.content = 'Hello world! I love JS!';
	  				setTimeout(cycle,1000);
	  			} else {
	  				setTimeout(cycle,getRandomInt(80,300));
	  			}
	  		} else if (self.language == 3) {
	  			self.time = self.time % python.length;
	  			self.helloworld = python.substr(0, self.time);
	  			if (self.time + 1 == python.length) {
	  				self.language = 4;
	  				self.time = 0;
	  				self.content = 'Hello world! I love python!';
	  				setTimeout(cycle,1000);
	  			} else {
	  				setTimeout(cycle,getRandomInt(80,300));
	  			}
	  		} else {
	  			self.time = self.time % cpp.length;
	  			self.helloworld = cpp.substr(0, self.time);
	  			if (self.time + 1 == cpp.length) {
	  				self.language = 1;
	  				self.time = 0;
	  				self.content = 'Hello world! I love C++!';
	  				setTimeout(cycle,1000);
	  			} else {
	  				setTimeout(cycle,getRandomInt(80,300));
	  			}
	  		}
	  	}, getRandomInt(100,500));
    }
  },
  mounted() {
  	this.printHelloWord();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/home.scss";
</style>