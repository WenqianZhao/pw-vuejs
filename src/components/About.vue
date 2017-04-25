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
			      Education<img src="../assets/images/icon/education.png" class="icon">
			    </template>
			  	<el-collapse v-model="subActiveName" accordion>
			  		<el-collapse-item title="Undergraduate" name="5">
			  			<el-row>
			  				<el-col :span="9">
			  					<img class="fdu-logo" src="../assets/images/universityLogo/fudan-logo.jpg">
			  				</el-col>
			  				<el-col :span="15" >
			  					<div>Bachelor of Science in Electrical Engineering</div>
			  					<div>From 2011 to 2015</div>
			  				</el-col>
			  			</el-row>
			  		</el-collapse-item>
			  		<el-collapse-item title="Graduate" name="6">
			  			<el-row>
			  				<el-col :span="9">
			  					<img class="neu-logo" src="../assets/images/universityLogo/neu-logo.jpg">
			  				</el-col>
			  				<el-col :span="15">
			  					<div class="neu-upper">Master of Science in Computer Engineering</div>
			  					<div>From 2015 to Now</div>
			  				</el-col>
			  			</el-row>
			  		</el-collapse-item>
			    </el-collapse>
			  </el-collapse-item>
			  <el-collapse-item name="2">
			  	<template slot="title">
			      Internship<img src="../assets/images/icon/internship.png" class="intern-icon">
			    </template>
			    <el-row>
	  				<el-col :span="9">
	  					<img class="digitalremedy-logo" src="../assets/images/digitalremedy.jpg">
	  				</el-col>
	  				<el-col :span="15" >
	  					<div class="dr-upper">Software Developer Intern</div>
	  					<div>From Jan 2017 to Now</div>
	  				</el-col>
	  			</el-row>
			  </el-collapse-item>
			  <el-collapse-item name="3">
			  	<template slot="title">
			      Skills<img src="../assets/images/icon/skill.png" class="intern-icon">
			    </template>
			    <el-row>
	  				<el-col :span="16">
	  					<img class="pl-img" src="../assets/images/programming-languages.jpg">
	  				</el-col>
	  				<el-col :span="8" >
	  					<div class="pl-title">Firmly Grasp :</div>
	  					<div>
	  						<el-tag>Java</el-tag>
	  						<el-tag>Javascript</el-tag>
	  						<el-tag>PHP</el-tag>
	  						<el-tag>Python</el-tag>
	  					</div>
	  					<div class="pl-title">Have Learnt :</div>
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
			      Hobby<img src="../assets/images/icon/hobby.png" class="hobby-icon">
			    </template>
			    <el-row>
	  				<el-col :span="8" class="card">
	  					<el-card>
	  						<img src="../assets/images/about-cards/singing.jpg" class="card-img">
	  						<div class="card-p">Listen to Music</div>
	  					</el-card>
	  				</el-col>
	  				<el-col :span="8" class="card">
	  					<el-card>
	  						<img src="../assets/images/about-cards/watchingsoccer.jpg" class="card-img">
	  						<div class="card-p">Watch Soccer Games</div>
	  					</el-card>
	  				</el-col>
	  				<el-col :span="8" class="card">
	  					<el-card>
	  						<img src="../assets/images/about-cards/csgo.jpg" class="card-img">
	  						<div class="card-p">Play Video Games</div>
	  					</el-card>
	  				</el-col>
	  			</el-row>
			  </el-collapse-item>
			  <el-collapse-item name="5">
			  	<template slot="title">
			      Social Media<img src="../assets/images/icon/social.png" class="hobby-icon">
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
var completeSentence = "Hello!My name is Wenqian Zhao.Nice to meet you :) ";

export default {
  data() {
    return {
    	activeName: '1',
    	subActiveName: '5',
    	helloParagraph: 'H',
    	time: 1,
    };
  },
  methods: {
   	printHello: function() {
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