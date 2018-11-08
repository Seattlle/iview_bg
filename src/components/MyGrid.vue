<template>
    <div class="grid">
        <p class="title">子元素向左排列</p>
        <Row type="flex" justify="start" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p class="title">子元素向右排列</p>
        <Row type="flex" justify="end" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p class="title">子元素居中排列</p>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p class="title">子元素等宽排列</p>
        <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
        <p class="title">子元素分散排列</p>
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
            <Col span="4">col-4</Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name:'grid'
    }
</script>

<style scoped>
    .title{
        margin:10px auto;
    }
    .grid .ivu-col, .grid .ivu-col div {
        color: #fff;
        padding: 10px 0;
        text-align: center;
        background: rgba(0,153,229,.9);
    }
    .grid .ivu-col:nth-child(odd) div, .grid .ivu-col:nth-child(odd) {
        background: rgba(0,153,229,.7);
    }
</style>
