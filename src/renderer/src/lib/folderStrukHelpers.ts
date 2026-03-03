export function getFolder(folderStruk, path): FolderItem {
    let node = folderStruk
    for (const id of path) {
        node = node.childs?.find((c) => c.id === id) || node
    }
    return node
}

export function findPath(root: FolderItem, targetId: string): string[] | null {
    if (root.id === targetId) return []
    if (root.childs) {
        for (const c of root.childs) {
            const sub = findPath(c, targetId)
            if (sub) return [c.id, ...sub]
        }
    }
    return null
}

export function findIndexPath(root: FolderItem, targetId: string): number[] | null {
    if (root.id === targetId) return []
    if (root.childs) {
        for (let i = 0; i < root.childs.length; i++) {
            const c = root.childs[i]
            const sub = findIndexPath(c, targetId)
            if (sub) return [i, ...sub]
        }
    }
    return null
}