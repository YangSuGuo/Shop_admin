import {type ComponentInternalInstance, getCurrentInstance} from "vue";

export default function useWarnConfirm() {
    const {appContext, proxy} = getCurrentInstance() as ComponentInternalInstance
    const global = appContext.config.globalProperties;
    return {proxy, global}
}