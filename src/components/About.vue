<template>
	<div>
	<el-row class="hello" type="flex" justify="center" align="middle">
		<p>{{helloParagraph}}</p>
	</el-row>
  <el-row class="about" type="flex" justify="center" align="middle">
	  <el-col :span="18">
	  	<el-collapse v-model="activeName" accordion>
			  <el-collapse-item name="1">
				  <template slot="title">
			      {{$t('about.Education')}}<img src="../assets/images/icon/education.png" class="icon">
			    </template>
			  	<el-collapse v-model="subActiveName" accordion>
			  		<el-collapse-item :title="this.$i18n.t('about.Undergraduate')" name="5">
			  			<el-row>
			  				<el-col :span="9">
			  					<img class="fdu-logo" src="../assets/images/universityLogo/fudan-logo.jpg">
			  				</el-col>
			  				<el-col :span="15" >
			  					<div>{{$t('about.b1')}}</div>
			  					<div>{{$t('about.b2')}}</div>
			  				</el-col>
			  			</el-row>
			  		</el-collapse-item>
			  		<el-collapse-item :title="this.$i18n.t('about.Graduate')" name="6">
			  			<el-row>
			  				<el-col :span="9">
			  					<img class="neu-logo" src="../assets/images/universityLogo/neu-logo.jpg">
			  				</el-col>
			  				<el-col :span="15">
			  					<div class="neu-upper">{{$t('about.m1')}}</div>
			  					<div>{{$t('about.m2')}}</div>
			  				</el-col>
			  			</el-row>
			  		</el-collapse-item>
			    </el-collapse>
			  </el-collapse-item>
			  <el-collapse-item name="2">
			  	<template slot="title">
			      {{$t('about.Internship')}}<img src="../assets/images/icon/internship.png" class="intern-icon">
			    </template>
			    <el-row>
	  				<el-col :span="9">
	  					<img class="digitalremedy-logo" src="../assets/images/digitalremedy.jpg">
	  				</el-col>
	  				<el-col :span="15" >
	  					<div class="dr-upper">{{$t('about.i1')}}</div>
	  					<div>{{$t('about.i2')}}</div>
	  				</el-col>
	  			</el-row>
			  </el-collapse-item>
			  <el-collapse-item name="3">
			  	<template slot="title">
			      {{$t('about.Skills')}}<img src="../assets/images/icon/skill.png" class="intern-icon">
			    </template>
			    <el-row>
	  				<el-col :span="16">
	  					<img class="pl-img" src="../assets/images/programming-languages.jpg">
	  				</el-col>
	  				<el-col :span="8" >
	  					<div class="pl-title">{{$t('about.fg')}}</div>
	  					<div>
	  						<el-tag>Java</el-tag>
	  						<el-tag>Javascript</el-tag>
	  						<el-tag>PHP</el-tag>
	  						<el-tag>Python</el-tag>
	  					</div>
	  					<div class="pl-title">{{$t('about.learnt')}}</div>
	  					<div>
	  						<el-tag>C/C++</el-tag>
	  						<el-tag>SQL</el-tag>
	  						<el-tag>Matlab</el-tag>
	  						<el-tag>Perl</el-tag>
	  					</div>
	  				</el-col>
	  			</el-row>
			  </el-collapse-item>
			  <el-collapse-item name="4">
			  	<template slot="title">
			      {{$t('about.Hobby')}}<img src="../assets/images/icon/hobby.png" class="hobby-icon">
			    </template>
			    <el-row>
	  				<el-col :span="8" class="card">
	  					<el-card>
	  						<img src="../assets/images/about-cards/singing.jpg" class="card-img">
	  						<div class="card-p">{{$t('about.music')}}</div>
	  					</el-card>
	  				</el-col>
	  				<el-col :span="8" class="card">
	  					<el-card>
	  						<img src="../assets/images/about-cards/watchingsoccer.jpg" class="card-img">
	  						<div class="card-p">{{$t('about.soccer')}}</div>
	  					</el-card>
	  				</el-col>
	  				<el-col :span="8" class="card">
	  					<el-card>
	  						<img src="../assets/images/about-cards/csgo.jpg" class="card-img">
	  						<div class="card-p">{{$t('about.game')}}</div>
	  					</el-card>
	  				</el-col>
	  			</el-row>
			  </el-collapse-item>
			  <el-collapse-item name="5">
			  	<template slot="title">
			      {{$t('about.social')}}<img src="../assets/images/icon/social.png" class="hobby-icon">
			    </template>
			    <el-row>
	  				<el-col :span="4" class="social">
	  					<a href="https://www.facebook.com/wenqian.zhao.54">
	  						<img src="../assets/images/icon/social/fb.png" class="social-icon">
	  					</a>
	  				</el-col>
	  				<el-col :span="4" class="social">
	  					<a href="http://weibo.com/u/2381346515?refer_flag=1005055010_&is_all=1">
	  						<img src="../assets/images/icon/social/weibo.png" class="social-icon">
	  					</a>
	  				</el-col>
	  				<el-col :span="4" class="social">
	  					<a href="https://github.com/WenqianZhao">
	  						<img src="../assets/images/icon/social/github.png" class="social-icon">
	  					</a>
	  				</el-col>
	  				<el-col :span="4" class="social">
	  					<a href="https://www.linkedin.com/in/%E6%96%87%E8%B0%A6-%E8%B5%B5-554898126/">
	  						<img src="../assets/images/icon/social/linkedin.png" class="social-icon">
	  					</a>
	  				</el-col>
	  			</el-row>
			  </el-collapse-item>
			</el-collapse>
		</el-col>
	</el-row>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
    	activeName: '1',
    	subActiveName: '5',
    	helloParagraph: this.$i18n.locale === "en" ? "H" : "欢",
    	time: 1,
    };
  },
  methods: {
   	printHello: function() {
   		if(this.$i18n.locale === "en"){
   			var completeSentence = "Hello!My name is Wenqian Zhao.Nice to meet you :) ";
   		} else {
   			var completeSentence = "欢迎来到赵文谦的小站，点开下面的卡片，就能更好地认识博主哟 ：） ";
   		}
   		var self = this;
	  	setTimeout(function cycle(){ 
	  		self.time++;
	  		self.time = self.time % completeSentence.length;
	  		self.helloParagraph = completeSentence.substr(0, self.time) + '_'; 
	  		setTimeout(cycle,500);
	  	}, 500);
   	}
  },
  mounted() {
  	this.printHello();
  }
}
</script>

<style lang="scss">
  @import "~styles/components/about.scss";
</style>