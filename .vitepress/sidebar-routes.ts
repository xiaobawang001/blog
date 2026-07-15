/**
 * 侧边栏配置处理模块
 * 数组 = 文章列表，对象 = 子目录，目录不混合
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'

const yamlPath = resolve(import.meta.dirname!, '../sidebar-tree.yaml')
const sidebarTree = parse(readFileSync(yamlPath, 'utf-8'))

/** 链接路径 → 标题 */
export const routeTitles: Record<string, string> = {}
/** 链接路径 → 排序权重 */
const orderByPath = new Map<string, number>()

let order = 0
function flatten(tree: Record<string, unknown>, parentPath = ''): void {
  for (const [key, value] of Object.entries(tree)) {
    const dirPath = `${parentPath}/${key}`
    routeTitles[dirPath] = key
    orderByPath.set(dirPath, order++)

    if (Array.isArray(value)) {
      for (const filename of value as string[]) {
        orderByPath.set(`${dirPath}/${filename}`, order++)
      }
    } else if (typeof value === 'object' && value !== null) {
      flatten(value as Record<string, unknown>, dirPath)
    }
  }
}
flatten(sidebarTree as Record<string, unknown>)

export function patchSidebar(items: any[]): void {
  for (const item of items) {
    if (item.link && routeTitles[item.link]) item.text = routeTitles[item.link]
    if (item.items) patchSidebar(item.items)
  }
  items.sort(
    (a: any, b: any) =>
      (orderByPath.get(a.link) ?? Infinity) - (orderByPath.get(b.link) ?? Infinity),
  )
}
