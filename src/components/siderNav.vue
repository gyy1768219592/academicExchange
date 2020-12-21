<template>
  <div>
    <a-menu
      style=""
      :default-select-keys="['1']"
      :open-keys.sync="open"
      mode="inline"
      @click="handleClick"
    >
      <a-menu-item key="1">
        <a-icon type="" /> 一个小房子
        <span>个人主页</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="" /> 一个小人头
        <span>个人基本信息</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="" /> 一个搜索图标
        <span>搜索</span>
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="" /> 
        <span>我的关注</span>
      </a-menu-item>
      <a-menu-item key="5">
        <a-icon type="" /> 
        <span>我的收藏</span>
      </a-menu-item>
      <a-menu-item key="6">
        <a-icon type="" />
        <span>我的消息</span>
      </a-menu-item>
    </a-menu>

  </div>
</template>
