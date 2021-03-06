import { BlockData, BlockType, Property, ValidationTypes, UIHint } from '@angular-cms/core';
import { PortfolioBlockComponent } from './portfolio-block.component';

@BlockType({
    displayName: "Portfolio Block",
    componentRef: PortfolioBlockComponent,
    description: "This is Portfolio block type"
})
export class PortfolioBlock extends BlockData {
    @Property({
        displayName: "Header",
        displayType: UIHint.Input,
        validates: [ValidationTypes.required("This field is required")]
    })
    header: string;

    @Property({
        displayName: "Header Icon",
        displayType: UIHint.Input
    })
    icon: string;

    @Property({
        displayName: "Summary",
        displayType: UIHint.Xhtml
    })
    summary: string;
}