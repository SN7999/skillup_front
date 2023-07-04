<script setup>
    import { onMounted, ref } from 'vue'
    import { getTrainingDetailAPI } from '@/apis/studentTraingAPI'
    import { ElMessage } from 'element-plus'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router'
    const route = useRoute()
    const classid = route.params.id
   
    //根据课程id获取课程信息
    //最终使用
    const detialInfo = ref(null)
    const getDetailInfo = async (classid) => {
        const  result  = await getTrainingDetailAPI(classid)
        detialInfo.value = result.data.data
    }

    //测试使用
    // const getDetailInfo = async () => {
    //     const  result  = await getTrainingDetailAPI()
    //     detialInfo.value = result.data.data
    // }

    onMounted(()=>{
        //最终使用
        //getDetailInfo(classid)
        //测试使用
        getDetailInfo(classid)
    })

    //回退到上一页
    const router = useRouter()
    const gotoPrevious = () => {
        router.push('/student/training');
    }

    const selectedMenuItem = ref('announcement');
    const selectedMenu = ref('announcement')

    const selectMenuItem = (item) => {
        selectedMenuItem.value = item;
        selectedMenu.value = item;
    };

    const chapterExpanded = ref({});

    function toggleCollapse(chapter) {
        chapterExpanded.value[chapter.chapternum] = !chapterExpanded.value[chapter.chapternum];
    }

    const showVideo = ref(false);
    const selectedVideo = ref('')
    //let videos = document.getElementById('playVideos')
    const showTxtContent = ref(false);
    const txtContent = ref("");
    const selectedTxtUrl = ref("");

    const showVide = (resource) => {
      selectedVideo.value = resource.url.replace(/\?.*/,'');
      showVideo.value = true;
    }

    const getVideo = () =>{
      return selectedVideo.value
    }

    const videoBack = () =>{
      selectedVideo.value = null
      showVideo.value = false
    }

    const showTxt = (resource) => {
      selectedTxtUrl.value = resource.url.replace(/(http|https):\/\/[^\s/]+/, '').replace(/\?.*/, '');
      //console.log('/api2'+selectedTxtUrl.value)
      getTxtContent('/api2'+selectedTxtUrl.value);
    };

    const getTxtContent = (url) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          txtContent.value = data;
          showTxtContent.value = true;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const txtBack = () =>{
      selectedTxtUrl.value = null
      showTxtContent.value = false;
    }

    const downloadDocument = (resource) => {
      const link = document.createElement('a');
      link.href = resource.url;
      link.target = '_blank';
      link.setAttribute('download', resource.filename);
      link.click();
    };
</script>

<template>
    <!-- 我是培训详情界面 -->
    <div v-if="detialInfo">
        <el-button @click="gotoPrevious()">
        返回
        </el-button>
        {{ detialInfo.classes.classname }} 
        -
        {{ classid }}
    </div>
    <div class="page-container">
      <div class="content">
        <div class="sidebar">
          <div class="menu-item" @click="selectMenuItem('announcement')" :class="{ 'selected': selectedMenu === 'announcement' }">
            <el-icon name="el-icon-message"></el-icon>
            <span class="text">公告</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('quiz')"  :class="{ 'selected': selectedMenu === 'quiz' }">
            <el-icon name="el-icon-edit-outline"></el-icon>
            <span class="text">测验</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('courseware')" :class="{ 'selected': selectedMenu === 'courseware' }">
            <el-icon name="el-icon-folder"></el-icon>
            <span class="text">课件</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('exam')" :class="{ 'selected': selectedMenu === 'exam' }">
            <el-icon name="el-icon-document"></el-icon>
            <span class="text">考试</span>
          </div>
        </div>
        <div class="main">
          <!-- 根据选择的菜单显示不同的内容 -->
          <div v-if="selectedMenuItem === 'announcement'">
            <h2>公告</h2>
            <!-- 公告界面的内容 -->
            <div v-if="detialInfo">
                <!-- 公告的时间怎么没有 -->
                {{ detialInfo.classes.announcement }}
            </div>
          </div>
          <div v-if="selectedMenuItem === 'quiz'">
            <h2>测验内容</h2>
            <!-- 测验界面的内容 -->
          </div>
          <div v-if="selectedMenuItem === 'courseware'">
            <h2>课件</h2>
            <!-- 课件界面的内容 -->
            <div v-if="detialInfo">
              <div v-if="!showVideo&&!showTxtContent">
                <div v-for="chapter in detialInfo.chapters" :key="chapter.chapternum"> 
                    <el-card style="margin-top: 10px;">
                        <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                            <span class="chapter-indicator" :class="{'expanded': chapterExpanded[chapter.chapternum]}"></span>
                            第 {{ chapter.chapternum }} 章：{{ chapter.chaptername }}
                        </h3>
                          <div v-show="chapterExpanded[chapter.chapternum]" class="chapter-content">
                            <div style="margin-top: 3px;font-size: 70%;">
                                {{ chapter.introduction }}
                            </div>
                            <div style="margin-top: 10px;" v-for="resource in detialInfo.resources" :key="resource.resourceId">
                                <div v-if="resource.chapterId == chapter.chapterid"> 
                                    <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(resource)">
                                        <p class="resource-text">视频：{{resource.resourcename}}</p>
                                    </div>
                                    <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                        <p class="resource-text">文本：{{resource.resourcename}}</p>
                                    </div>
                                    <div v-if="resource.type === 'ppt'" class="resource-box document" @click="downloadDocument(resource)">
                                        <p class="resource-text">ppt：{{resource.resourcename}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
              </div>
            </div>
            <div v-if="showVideo">
              <!-- 视频展示界面 -->
              <video :src="getVideo()" id="playVideos" controls preload>
              </video>
              <button @click="videoBack()">返回</button>
            </div>
            <div v-if="showTxtContent">
              <!-- 根据需要设置文本展示区域的样式 -->
              <textarea v-model="txtContent" rows="10" cols="50" readonly></textarea>
              <button @click="txtBack()">返回</button>
            </div>
          </div>
          <div v-if="selectedMenuItem === 'exam'">
            <h2>考试内容</h2>
            <!-- 考试界面的内容 -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
.page-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #1890ff;
  color: white;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 999;
}

.header .icon {
  color: white;
  margin-right: 10px;
}

.content {
  flex: 1;
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #1890ff;
  border-radius: 10px;
  margin: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #000;
  font-size: 18px; /* 修改字体字号为18px */
  font-weight: bold; /* 修改字体粗细为粗体 */
  margin: 10px 0; /* 修改上下距离为10px */
}

.selected {
  color: blue;
}

.text {
  margin-left: 10px;
}

.main {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #1890ff;
  border-radius: 10px;
  margin: 20px;
  overflow: auto;
}

.content-box {
  margin-bottom: 20px;
}

.resource-box {
    display: inline-block;
    padding: 1px 1px;
    border: 2px solid green;
    border-radius: 4px;
    margin-right: 8px;
  }

  .video {
    border-color: green;
  }

  .document {
    border-color: green;
  }

  .resource-text {
    color: green;
    font-size: 90%;
    line-height: 1;
    margin: 1px;
  }

.chapter-title {
position: relative;
cursor: pointer;
margin-top: 0;
margin-bottom: 0;
}
.chapter-indicator {
position: absolute;
top: 50%;
right: 10px;
transform: translateY(-50%);
width: 0;
height: 0;
border-top: 5px solid transparent;
border-bottom: 5px solid transparent;
border-left: 5px solid #333;
transition: transform 0.3s ease;
}
.chapter-indicator.expanded {
transform: translateY(-50%) rotate(90deg);
}
.chapter-content {
margin-top: 10px;
}
</style>