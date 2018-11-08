<template>
    <div class="demo-split">
        <Split>
            <div slot="left" class="demo-split-pane no-padding">
                <Split v-model="top" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        Top Pane
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        Bottom Pane
                    </div>
                </Split>
            </div>
            <div slot="right" class="demo-split-pane">
                Right Pane
            </div>
        </Split>
    </div>
</template>

<script>
    export default {
        name: "MyIndex",
        data () {
            return {
                top:0.5,
            }
        },
    }
</script>

<style scoped>
    .demo-split{
        height: 100%;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
    .demo-split-pane.no-padding{
        height: 100%;
        padding: 0;
    }
</style>