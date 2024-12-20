from typing import Dict, List, Optional, Union
import json

class AccessibilityNode:
    def __init__(self, data: Dict):
        self.role = data.get('role', '')
        self.name = data.get('name', '')
        self.bid = data.get('bid', '')  # This would be like 'a307'
        self.children = []
        self.parent = None
        
        # Copy other relevant properties
        self.url = data.get('url', '')
        self.live = data.get('live', '')
        self.atomic = data.get('atomic', False)
        self.relevant = data.get('relevant', '')
        self.focused = data.get('focused', False)

def parse_accessibility_tree(text: str) -> AccessibilityNode:
    """Parse the text representation of accessibility tree into a tree structure."""
    lines = text.split('\n')
    root = None
    stack = []
    current_indent = 0
    
    for line in lines:
        if not line.strip():
            continue
            
        # Calculate indent level
        indent = len(line) - len(line.lstrip('\t'))
        line = line.strip()
        
        # Parse node information
        node_data = {'role': '', 'name': '', 'bid': ''}
        
        # Extract bid if present
        if line.startswith('['):
            bid_end = line.find(']')
            if bid_end != -1:
                node_data['bid'] = line[1:bid_end]
                line = line[bid_end + 1:].strip()
        
        # Parse role and name
        parts = line.split("'")
        if len(parts) >= 2:
            node_data['role'] = parts[0].strip()
            node_data['name'] = parts[1].strip()
        else:
            node_data['role'] = line
            
        # Create node
        node = AccessibilityNode(node_data)
        
        # Handle tree structure
        if not root:
            root = node
            stack = [node]
            current_indent = indent
        else:
            while indent <= current_indent and stack:
                stack.pop()
                current_indent -= 1
            
            if stack:
                parent = stack[-1]
                parent.children.append(node)
                node.parent = parent
            
            stack.append(node)
            current_indent = indent
    
    return root

def find_node_by_bid(root: AccessibilityNode, target_bid: str) -> Optional[AccessibilityNode]:
    """Find a node with the specified bid."""
    if root.bid == target_bid:
        return root
        
    for child in root.children:
        result = find_node_by_bid(child, target_bid)
        if result:
            return result
            
    return None

def get_path_to_bid(root: AccessibilityNode, target_bid: str) -> List[Dict[str, str]]:
    """Get the path from root to the node with target_bid."""
    node = find_node_by_bid(root, target_bid)
    if not node:
        return []
        
    path = []
    current = node
    while current:
        path.append({
            'bid': current.bid,
            'role': current.role,
            'name': current.name
        })
        current = current.parent
        
    return list(reversed(path))

def main():
    # Your accessibility tree text
    accessibility_tree_text = """RootWebArea 'Catalog | ServiceNow', url='https://dev280094.service-now.com/now/nav/ui/classic/params/target/catalog_home.do%3Fsysparm_view%3Dcatalog_default'
	[46] generic, live='assertive', atomic, relevant='additions text'
	[47] generic, live='polite', atomic, relevant='additions text'
	[52] generic, live='polite', atomic, relevant='all'
	[55] navigation 'Global skip links'
		[56] link 'Skip to main content', url='javascript:void(0);'
		[57] link 'Open accessibility preferences', url='javascript:void(0);'
	[58] generic, live='polite', atomic, relevant='additions text'
	[61] navigation 'Primary'
		navigation 'Unpinned All menu', live='polite', relevant='additions text'
		navigation 'Unpinned Favorites menu', live='polite', relevant='additions text'
		navigation 'Unpinned History menu', live='polite', relevant='additions text'
		navigation 'Unpinned Workspaces menu', live='polite', relevant='additions text'
		navigation 'Unpinned Admin menu', live='polite', relevant='additions text'
		navigation 'More menus', live='polite', relevant='additions text'
		[65] button 'My ServiceNow landing page', describedby='logo-tooltip'
			[66] image 'ServiceNow Service Management', url='https://dev280094.service-now.com/uxta/108bedc5c3354a1088f49dfc0501310a.assetx'
		[78] button 'All', expanded=False
		[79] button 'Favorites', expanded=False
		[80] button 'History', expanded=False
		[81] button 'Workspaces', expanded=False
		[83] button 'More menus', expanded=False
		generic, describedby='title-tooltip'
			StaticText 'Catalog'
			[96] button 'Create favorite for Catalog', live='polite', relevant='additions text', pressed='false'
		[108] search ''
			[112] combobox 'Search', autocomplete='both', hasPopup='listbox', expanded=False
			[113] region '', live='polite', relevant='additions text'
				StaticText 'No exact match. Press Enter for full results.'
			[114] combobox 'Choose search context', hasPopup='listbox', expanded=False
		[125] button 'Scope selectors', expanded=False
		[132] button 'Sidebar discussions', expanded=False
		[138] button 'Show help', expanded=False
		[166] button 'Show notifications', expanded=False
		[178] button 'Jacob Foster: available', expanded=False
			[181] image 'Jacob Foster is Available'
				StaticText 'JF'
	[196] main ''
		[199] image 'Loading'
		[a] Iframe 'Main Content'
			RootWebArea 'Catalog', focused, busy=1, url='https://dev280094.service-now.com/catalog_home.do?sysparm_view=catalog_default'
				[a35] region '', live='polite', relevant='additions text'
				[a36] region '', live='assertive', relevant='additions text'
				[a56] navigation ''
					[a57] table ''
						[a58] rowgroup ''
							[a59] row ''
								[a60] cell 'Service Catalog'
									[a62] heading 'Service Catalog'
								[a63] cell ''
								[a64] cell 'Catalog'
									[a66] search 'Catalog'
										StaticText '\uf1e4'
										[a85] combobox 'Search catalog', focused, autocomplete='list', hasPopup='listbox', expanded=False, controls=''
										[a86] button 'Recent searches'
								[a88] cell 'Add content'
									[a90] button 'Add content'
										StaticText '\uf108'
				[a92] table ''
					[a93] rowgroup ''
						[a94] row ''
							[a95] cell ''
						[a97] row ''
							[a98] cell 'Edit Widget Edit Widget Preferences Close Edit Widget Edit Widget Preferences Close Edit Widget Edit Widget Preferences Close Edit Widget Edit Widget Preferences Close'
								[a101] table ''
									[a102] rowgroup ''
										[a103] row ''
											[a109] heading 'Services'
												[a110] link 'Services', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=109f0438c6112276003ae8ac13e7009d&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a113] button 'Edit Widget'
									StaticText '\uf17e'
								[a114] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a115] button 'Close'
									StaticText '\uf158'
								[a119] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=109f0438c6112276003ae8ac13e7009d&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a120] table ''
										[a121] rowgroup ''
											[a122] row ''
												[a123] cell ''
												[a126] cell 'Services. Document production services. Create and produce high-quality, professional documents. Document production services. Create and produce high-quality, professional documents.'
													[a127] link 'Services. Document production services. Create and produce high-quality, professional documents.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=109f0438c6112276003ae8ac13e7009d&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a128] heading 'Services'
													StaticText 'Document production services. Create and produce high-quality, professional documents.'
								[a136] table ''
									[a137] rowgroup ''
										[a138] row ''
											[a144] heading 'Can We Help You?'
												[a145] link 'Can We Help You?', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=e15706fc0a0a0aa7007fc21e1ab70c2f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a148] button 'Edit Widget'
									StaticText '\uf17e'
								[a149] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a150] button 'Close'
									StaticText '\uf158'
								[a154] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=e15706fc0a0a0aa7007fc21e1ab70c2f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a155] table ''
										[a156] rowgroup ''
											[a157] row ''
												[a158] cell ''
												[a161] cell 'Can We Help You?. Your IT gateway. Report issues and submit requests. Your IT gateway. Report issues and submit requests.'
													[a162] link 'Can We Help You?. Your IT gateway. Report issues and submit requests.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=e15706fc0a0a0aa7007fc21e1ab70c2f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a163] heading 'Can We Help You?'
													StaticText 'Your IT gateway. Report issues and submit requests.'
								[a171] table ''
									[a172] rowgroup ''
										[a173] row ''
											[a179] heading 'Office'
												[a180] link 'Office', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=109cdff8c6112276003b17991a09ad65&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a183] button 'Edit Widget'
									StaticText '\uf17e'
								[a184] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a185] button 'Close'
									StaticText '\uf158'
								[a189] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=109cdff8c6112276003b17991a09ad65&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a190] table ''
										[a191] rowgroup ''
											[a192] row ''
												[a193] cell ''
												[a196] cell 'Office. Office services such as printing, supplies requisition and document shipping and delivery. Office services such as printing, supplies requisition and document shipping and delivery.'
													[a197] link 'Office. Office services such as printing, supplies requisition and document shipping and delivery.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=109cdff8c6112276003b17991a09ad65&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a198] heading 'Office'
													StaticText 'Office services such as printing, supplies requisition and document shipping and delivery.'
								[a206] table ''
									[a207] rowgroup ''
										[a208] row ''
											[a214] heading 'Peripherals'
												[a215] link 'Peripherals', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=2c0b59874f7b4200086eeed18110c71f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a218] button 'Edit Widget'
									StaticText '\uf17e'
								[a219] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a220] button 'Close'
									StaticText '\uf158'
								[a224] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=2c0b59874f7b4200086eeed18110c71f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a225] table ''
										[a226] rowgroup ''
											[a227] row ''
												[a228] cell ''
												[a231] cell 'Peripherals. End user peripherals such as mobile phone cases, dongles, and cables End user peripherals such as mobile phone cases, dongles, and cables'
													[a232] link 'Peripherals. End user peripherals such as mobile phone cases, dongles, and cables', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=2c0b59874f7b4200086eeed18110c71f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a233] heading 'Peripherals'
													StaticText 'End user peripherals such as mobile phone cases, dongles, and cables'
							[a240] cell 'Edit Widget Edit Widget Preferences Close Edit Widget Edit Widget Preferences Close Edit Widget Edit Widget Preferences Close Edit Widget Edit Widget Preferences Close'
								[a243] table ''
									[a244] rowgroup ''
										[a245] row ''
											[a251] heading 'Hardware'
												[a252] link 'Hardware', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=d258b953c611227a0146101fb1be7c31&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a255] button 'Edit Widget'
									StaticText '\uf17e'
								[a256] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a257] button 'Close'
									StaticText '\uf158'
								[a261] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=d258b953c611227a0146101fb1be7c31&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a262] table ''
										[a263] rowgroup ''
											[a264] row ''
												[a265] cell ''
												[a268] cell 'Hardware. Order from a variety of hardware to meet your business needs, including phones, tablets and laptops. Order from a variety of hardware to meet your business needs, including phones, tablets and laptops.'
													[a269] link 'Hardware. Order from a variety of hardware to meet your business needs, including phones, tablets and laptops.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=d258b953c611227a0146101fb1be7c31&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a270] heading 'Hardware'
													StaticText 'Order from a variety of hardware to meet your business needs, including phones, tablets and laptops.'
								[a278] table ''
									[a279] rowgroup ''
										[a280] row ''
											[a286] heading 'Software'
												[a287] link 'Software', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=2809952237b1300054b6a3549dbe5dd4&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a290] button 'Edit Widget'
									StaticText '\uf17e'
								[a291] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a292] button 'Close'
									StaticText '\uf158'
								[a296] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=2809952237b1300054b6a3549dbe5dd4&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a297] table ''
										[a298] rowgroup ''
											[a299] row ''
												[a300] cell ''
												[a303] cell 'Software. A range of software products available for installation on your corporate laptop or desktop computer. A range of software products available for installation on your corporate laptop or desktop computer.'
													[a304] link 'Software. A range of software products available for installation on your corporate laptop or desktop computer.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=2809952237b1300054b6a3549dbe5dd4&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a305] heading 'Software'
													StaticText 'A range of software products available for installation on your corporate laptop or desktop computer.'
								[a313] table ''
									[a314] rowgroup ''
										[a315] row ''
											[a321] heading 'Desktops'
												[a322] link 'Desktops', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=900682363731300054b6a3549dbe5d5f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a325] button 'Edit Widget'
									StaticText '\uf17e'
								[a326] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a327] button 'Close'
									StaticText '\uf158'
								[a331] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=900682363731300054b6a3549dbe5d5f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a332] table ''
										[a333] rowgroup ''
											[a334] row ''
												[a335] cell ''
												[a338] cell 'Desktops. Desktop computers for your work area. Desktop computers for your work area.'
													[a339] link 'Desktops. Desktop computers for your work area.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=900682363731300054b6a3549dbe5d5f&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a340] heading 'Desktops'
													StaticText 'Desktop computers for your work area.'
								[a348] table ''
									[a349] rowgroup ''
										[a350] row ''
											[a356] heading 'Mobiles'
												[a357] link 'Mobiles', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=d68eb4d637b1300054b6a3549dbe5db2&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a360] button 'Edit Widget'
									StaticText '\uf17e'
								[a361] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a362] button 'Close'
									StaticText '\uf158'
								[a366] link '', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=d68eb4d637b1300054b6a3549dbe5db2&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
									[a367] table ''
										[a368] rowgroup ''
											[a369] row ''
												[a370] cell ''
												[a373] cell 'Mobiles. Cell phones to meet your business needs. Cell phones to meet your business needs.'
													[a374] link 'Mobiles. Cell phones to meet your business needs.', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_category_view.do?v=1&sysparm_parent=d68eb4d637b1300054b6a3549dbe5db2&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
														[a375] heading 'Mobiles'
													StaticText 'Cell phones to meet your business needs.'
							[a382] cell 'Edit Widget Edit Widget Preferences Close iPad pro Request email alias Access Cisco jabber softphone Standard Laptop Edit Widget Preferences Close Shopping Cart Empty'
								[a385] table ''
									[a386] rowgroup ''
										[a387] row ''
											[a393] heading 'Top Requests'
								[a396] button 'Edit Widget'
									StaticText '\uf17e'
								[a397] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a398] button 'Close'
									StaticText '\uf158'
								[a404] image '', url='https://dev280094.service-now.com/65647517974fc51021983d1e6253af78.iix'
								[a405] link 'iPad pro', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=c3b9cbf29716cd1021983d1e6253afad&sysparm_link_parent=c3d3e02b0a0a0b12005063c7b2fa4f93&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a408] image '', url='https://dev280094.service-now.com/08d4cdcf978f451021983d1e6253afe3.iix'
								[a409] link 'Request email alias', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=0317ba9d47120510f53d37d2846d43bb&sysparm_link_parent=c3d3e02b0a0a0b12005063c7b2fa4f93&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a412] image '', url='https://dev280094.service-now.com/images/service_catalog/generic_small.gifx'
								[a413] link 'Access', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=039c516237b1300054b6a3549dbe5dfc&sysparm_link_parent=c3d3e02b0a0a0b12005063c7b2fa4f93&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a416] image '', url='https://dev280094.service-now.com/be233993974fc51021983d1e6253aff1.iix'
								[a417] link 'Cisco jabber softphone', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=03e7c02c471e0950f53d37d2846d433c&sysparm_link_parent=c3d3e02b0a0a0b12005063c7b2fa4f93&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a420] image '', url='https://dev280094.service-now.com/images/service_catalog/generic_small.gifx'
								[a421] link 'Standard Laptop', url='https://dev280094.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=04b7e94b4f7b4200086eeed18110c7fd&sysparm_link_parent=c3d3e02b0a0a0b12005063c7b2fa4f93&sysparm_catalog=e0d08b13c3330100c8b837659bba8fb4&sysparm_catalog_view=catalog_default&sysparm_view=catalog_default'
								[a428] table ''
									[a429] rowgroup ''
										[a430] row ''
											[a436] heading ''
								[a439] button 'Edit Widget Preferences'
									StaticText '\uf13e'
								[a440] button 'Close'
									StaticText '\uf158'
								[a444] LayoutTable ''
									[a446] LayoutTableRow ''
										[a447] LayoutTableCell 'Shopping Cart'
											[a448] heading 'Shopping Cart'
									[a449] LayoutTableRow ''
										[a450] LayoutTableCell 'Empty'
						[a457] row ''
							[a458] cell ''
				[a499] status '', live='polite', atomic, relevant='additions text'
				[a500] generic, live='polite', relevant='additions text'
    """
    
    # Parse the tree
    root = parse_accessibility_tree(accessibility_tree_text)
    
    # Find path for bid 'a307'
    target_bid = 'a405'
    path = get_path_to_bid(root, target_bid)
    
    # Print the path
    print(f"\nPath to bid '{target_bid}':")
    for i, node in enumerate(path):
        indent = "  " * i
        print(f"{indent}[{node['bid']}] {node['role']}: '{node['name']}'")

if __name__ == "__main__":
    main()