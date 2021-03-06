import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceLocator, Page, PageService } from '@angular-cms/core';
import { TreeNode } from '../shared/tree/interfaces/tree-node';
import { TreeComponent } from '../shared/tree/components/tree.component';
import { TreeConfig } from '../shared/tree/interfaces/tree-config';
import { NodeMenuItemAction } from '../shared/tree/interfaces/tree-menu'
import { PageTreeService } from './page-tree.service';
import { SubscriptionComponent } from '../shared/subscription.component';
import { SubjectService } from '../shared/services/subject.service';

@Component({
    template: `
        <cms-tree 
            class="tree-root pl-1 pt-2 d-block" 
            [root]="root"
            [config]="treeConfig"
            (nodeSelected)="pageSelected($event)"
            (nodeCreated)="pageCreated($event)"
            (nodeDeleteEvent)="pageDelete($event)">
            <ng-template #treeNodeTemplate let-node>
                <span [ngClass]="{'page-node': node.id != '0', 'border-bottom': node.isSelected && node.id != '0'}">
                    <fa-icon class="mr-1" *ngIf="node.id == '0'" [icon]="['fas', 'sitemap']"></fa-icon>
                    <fa-icon class="mr-1" *ngIf="node.id != '0'" [icon]="['fas', 'file']"></fa-icon>
                    <span>{{node.name}}</span>
                    <span *ngIf="node.id == '0'" class="badge badge-info float-right mt-2 mr-1" [routerLink]="['new/page']">NEW</span>
                </span>
            </ng-template>
        </cms-tree>
        `,
    styles: [`
        .page-node {
            width: calc(100% - 20px);
            cursor: pointer;
            display: inline-block;
        }

        .page-node:hover {
            font-weight: bold;
            border-bottom: 1px solid #a4b7c1!important;
        }
  `]
})
export class PageTreeComponent extends SubscriptionComponent {
    @ViewChild(TreeComponent, { static: false }) cmsTree: TreeComponent;

    root: TreeNode = new TreeNode({ id: '0', name: 'Root', hasChildren: true });
    treeConfig: TreeConfig = {
        service: ServiceLocator.Instance.get(PageTreeService),
        menuItems: [
            {
                action: NodeMenuItemAction.NewNode,
                name: "New Page"
            },
            {
                action: NodeMenuItemAction.Cut,
                name: "Cut"
            },
            {
                action: NodeMenuItemAction.Copy,
                name: "Copy"
            },
            {
                action: NodeMenuItemAction.Paste,
                name: "Paste"
            },
            {
                action: NodeMenuItemAction.Delete,
                name: "Delete"
            },
        ]
    }

    constructor(
        private pageService: PageService,
        private subjectService: SubjectService,
        private router: Router,
        private route: ActivatedRoute) {
        super()
    }

    ngOnInit() {
        this.subscriptions.push(this.subjectService.pageCreated$.subscribe((createdPage: Page) => {
            //Reload parent page
            //Reload the children of parent to update the created page
            this.cmsTree.selectNode({ id: createdPage._id, isNeedToScroll: true });
            this.cmsTree.reloadSubTree(createdPage.parentId);
        }));

        this.subscriptions.push(this.subjectService.pageSelected$.subscribe((selectedPage: Page) => {
            this.cmsTree.locateToSelectedNode(new TreeNode({
                id: selectedPage._id,
                isNeedToScroll: true,
                name: selectedPage.name,
                hasChildren: selectedPage.hasChildren,
                parentId: selectedPage.parentId,
                parentPath: selectedPage.parentPath
            }));
        }));
    }

    pageSelected(node: TreeNode) {
        if (node.id == '0') return;
        this.router.navigate(["content/page", node.id], { relativeTo: this.route })
    }

    pageCreated(parentNode: TreeNode) {
        this.router.navigate(["new/page", parentNode.id], { relativeTo: this.route })
    }

    pageDelete(nodeToDelete: TreeNode) {
        if (nodeToDelete.id == '0') return;
        this.pageService.softDeleteContent(nodeToDelete.id).subscribe(([pageToDelete, deleteResult]: [Page, any]) => {
            console.log(deleteResult);
            this.cmsTree.selectNode({ id: pageToDelete.parentId, isNeedToScroll: true });
            this.cmsTree.reloadSubTree(pageToDelete.parentId);
        });
    }
}