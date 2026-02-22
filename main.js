/**
 * Advanced WebReport AI Knowledge Base & Scoring Logic
 */

const KNOWLEDGE_BASE = [
    // --- Node & Version Management ---
    { tag: 'NODEINFO:NAME', category: 'node', desc: 'Get the name/title of a node.', keywords: ['name', 'title', 'node name'] },
    { tag: 'NODEINFO:ID', category: 'node', desc: 'Get the DataID of a node.', keywords: ['dataid', 'object id', 'node id'] },
    { tag: 'NODEINFO:PARENTID', category: 'node', desc: 'Get the ID of the parent container (folder).', keywords: ['parent', 'folder id', 'location'] },
    { tag: 'NODEINFO:SUBTYPE', category: 'node', desc: 'Get the node subtype ID.', keywords: ['subtype', 'class id', 'type'] },
    { tag: 'NODEINFO:SIZE:BYTES', category: 'node', desc: 'Get the size of a node in bytes.', keywords: ['size', 'bytes', 'file size'] },
    { tag: 'NODEINFO:PATH:name', category: 'node', desc: 'Get the full path of a node.', keywords: ['path', 'location', 'breadcrumb'] },
    { tag: 'NODEACTION:CREATE:parent:type:name', category: 'action', desc: 'Create a new node (folder, document, etc.).', keywords: ['create', 'add', 'new folder', 'new document'] },
    { tag: 'NODEACTION:DELETE', category: 'action', desc: 'Delete a node from Content Server.', keywords: ['delete', 'remove', 'trash'] },
    { tag: 'NODEACTION:COPY:dest', category: 'action', desc: 'Copy a node to a destination folder.', keywords: ['copy', 'duplicate', 'clone'] },
    { tag: 'NODEACTION:MOVE:dest', category: 'action', desc: 'Move a node to a destination folder.', keywords: ['move', 'relocate', 'transfer'] },
    { tag: 'NODEACTION:RENAME:name', category: 'action', desc: 'Rename an existing node.', keywords: ['rename', 'change name'] },
    { tag: 'RESERVE:userID', category: 'node', desc: 'Reserve (checkout) a node to a specific user.', keywords: ['reserve', 'checkout', 'lock node'] },
    { tag: 'UNRESERVE', category: 'node', desc: 'Unreserve (checkin) a node.', keywords: ['unreserve', 'checkin', 'unlock node'] },
    { tag: 'VERSIONCONTROL:type', category: 'node', desc: 'Set version control to STANDARD or ADVANCED.', keywords: ['version control', 'advanced versioning'] },
    { tag: 'RENDITIONACTION:DELETE:ver:type', category: 'node', desc: 'Delete a specific rendition of a version.', keywords: ['delete rendition', 'remove rendition'] },
    { tag: 'VERINFO:FILENAME', category: 'node', desc: 'Get the filename of a specific version.', keywords: ['version filename', 'file name'] },
    { tag: 'VERSIONACTION:LOCK', category: 'node', desc: 'Lock a specific version of a node.', keywords: ['lock version', 'freeze version'] },
    { tag: 'CAT:{CAT_NAME}:{ATTR_NAME}:DISPLAY', category: 'metadata', desc: 'Access category attributes for the latest version.', keywords: ['category', 'attribute', 'metadata', 'get value'] },
    { tag: 'VERSIONCAT:ver:{CAT_NAME}:{ATTR_NAME}:DISPLAY', category: 'metadata', desc: 'Access category attributes for a specific version.', keywords: ['version category', 'past attribute'] },
    { tag: 'CATACTION:SETVALUE:{CAT_NAME}:{ATTR_NAME}:{VALUE}', category: 'metadata', desc: 'Set a specific category attribute value.', keywords: ['set attribute', 'update metadata', 'cataction set', 'setvalue'] },
    { tag: 'CATACTION:ADDVALUE:{CAT_NAME}:{ATTR_NAME}:{VALUE}', category: 'metadata', desc: 'Append a value to a multi-value attribute.', keywords: ['add attribute', 'append metadata', 'addvalue'] },
    { tag: 'CATACTION:REMOVEVALUE:{CAT_NAME}:{ATTR_NAME}', category: 'metadata', desc: 'Remove an attribute value or a multi-value index.', keywords: ['remove attribute', 'delete metadata', 'removevalue'] },
    { tag: 'CATACTION:ADD:{CAT_NAME}', category: 'metadata', desc: 'Add a new category to a node.', keywords: ['add category', 'apply metadata'] },
    { tag: 'CATACTION:REMOVE:{CAT_NAME}', category: 'metadata', desc: 'Remove a category from a node.', keywords: ['remove category', 'detach metadata'] },
    { tag: 'CATINFO:DEFINITION', category: 'metadata', desc: 'Get the technical schema definition of a category.', keywords: ['catinfo', 'schema', 'attribute list'] },
    { tag: 'CATINFO:VALIDVALUES:attrID', category: 'metadata', desc: 'Get valid values for a popup/lookup attribute.', keywords: ['valid values', 'lookup list', 'dropdown'] },


    // --- Content Control Tags ---
    { tag: 'LL_WEBREPORT_CALL:name:parms', category: 'control', desc: 'Call a server-side Oscript function.', keywords: ['call', 'oscript', 'server script'] },
    { tag: 'LL_WEBREPORT_COMPILER:RUNTIMETAGS', category: 'control', desc: 'Eval constants/parameters at runtime.', keywords: ['compiler', 'eval', 'runtime tags'] },
    { tag: 'LL_WEBREPORT_COMPRESS', category: 'control', desc: 'Remove white space from final output.', keywords: ['compress', 'minify', 'white space'] },
    { tag: 'LL_WEBREPORT_ENABLEROWFILTERS', category: 'control', desc: 'Enable supporter for dynamic fc_filters.', keywords: ['filters', 'dynamic filter', 'fc_filters'] },
    { tag: 'LL_WEBREPORT_EXCLUDEHTML', category: 'control', desc: 'Exclude all standard CS wrapping (HTML/JS/CSS).', keywords: ['exclude html', 'raw output', 'xml mode'] },
    { tag: 'LL_WEBREPORT_EXITIF:expr', category: 'control', desc: 'Stop processing rows when condition is met.', keywords: ['exit if', 'break', 'conditional stop'] },
    { tag: 'LL_WEBREPORT_FOR:VAR:row:DATA:list', category: 'control', desc: 'Loop over a collection (List, RecArray, etc.).', keywords: ['for loop', 'iterate', 'each'] },
    { tag: 'LL_WEBREPORT_IF:expr', category: 'control', desc: 'Conditional execution block.', keywords: ['if', 'elseif', 'else', 'condition'] },
    { tag: 'LL_WEBREPORT_INCLUDEDISTINCT:key', category: 'control', desc: 'Limit rows to unique key values.', keywords: ['distinct', 'unique', 'deduplicate'] },
    { tag: 'LL_WEBREPORT_INCLUDEIF:expr', category: 'control', desc: 'Determine if row will be included.', keywords: ['include if', 'row filter'] },
    { tag: 'LL_WEBREPORT_INCLUDERANGE:START:END:MAX', category: 'control', desc: 'Limit rows to a specific range.', keywords: ['range', 'pagination', 'maxrows'] },
    { tag: 'LL_WEBREPORT_INSERTJSON', category: 'control', desc: 'Insert data formatted as JSON.', keywords: ['insert json', 'api response'] },
    { tag: 'LL_WEBREPORT_JSLIBS:libs', category: 'control', desc: 'Insert standard CS JavaScript libraries.', keywords: ['js libs', 'jquery', 'browse js'] },
    { tag: 'LL_WEBREPORT_RESTCLIENT', category: 'control', desc: 'Send requests to external REST APIs.', keywords: ['rest', 'api', 'http request'] },
    { tag: 'LL_WEBREPORT_SORT:key:dir', category: 'control', desc: 'Sort the report data set.', keywords: ['sort', 'order by'] },
    { tag: 'LL_WEBREPORT_SUBWEBREPORT:id', category: 'control', desc: 'Call another WebReport and insert results.', keywords: ['sub webreport', 'nested'] },


    // --- Data & Request Tags ---
    { tag: '[LL_REPTAG=&parm /]', category: 'data', desc: 'Access URL parameters (querystring).', keywords: ['url parameter', 'query string', 'request'] },
    { tag: '[LL_REPTAG_$const /]', category: 'data', desc: 'Access WebReport constants.', keywords: ['constant', 'infrastructure'] },
    { tag: '[LL_REPTAG_!var /]', category: 'data', desc: 'Shorthand for CURRENTVAL of a variable.', keywords: ['variable', 'current value'] },
    { tag: '[LL_REPTAG_@SUM_col /]', category: 'data', desc: 'Returns the sum of all values in a column.', keywords: ['sum', 'total', 'math'] },
    { tag: '[LL_REPTAG_ACTUALROWS /]', category: 'data', desc: 'Number of rows after INCLUDEIF filtering.', keywords: ['actual rows', 'filtered count'] },
    { tag: '[LL_REPTAG_DATE /]', category: 'data', desc: 'Current execution date.', keywords: ['date', 'today'] },
    { tag: '[LL_REPTAG_DATETIME /]', category: 'data', desc: 'Current execution date and time.', keywords: ['datetime', 'now'] },
    { tag: '[LL_REPTAG_DATASOURCE /]', category: 'data', desc: 'Full report data source as a RecArray.', keywords: ['datasource', 'raw data'] },
    { tag: '[LL_REPTAG_EACID /]', category: 'data', desc: 'DataID on which an EAC action is performed.', keywords: ['eac', 'event id'] },
    { tag: '[LL_REPTAG_LANGUAGE /]', category: 'data', desc: 'System language currently in use.', keywords: ['language', 'locale'] },
    { tag: '[LL_REPTAG_MYID /]', category: 'data', desc: 'ObjectID of the current WebReport.', keywords: ['myid', 'webreport id'] },
    { tag: '[LL_REPTAG_MYURL /]', category: 'data', desc: 'URL used to run the current WebReport.', keywords: ['myurl', 'callback'] },
    { tag: '[LL_REPTAG_OTCSTICKET /]', category: 'data', desc: 'Generates an OTCSTicket for REST API calls.', keywords: ['ticket', 'auth', 'rest ticket'] },
    { tag: '[LL_REPTAG_ROWDATA /]', category: 'data', desc: 'Returns the Record for the current row.', keywords: ['rowdata', 'record'] },
    { tag: '[LL_REPTAG_ROWNUM /]', category: 'data', desc: 'Current row number.', keywords: ['rownum', 'index'] },
    { tag: '[LL_REPTAG_SOURCEID /]', category: 'data', desc: 'DataID of the data source.', keywords: ['sourceid', 'datasource id'] },
    { tag: '[LL_REPTAG_TRIGGER /]', category: 'data', desc: 'The event that triggered the WebReport.', keywords: ['trigger', 'event'] },
    { tag: '[LL_REPTAG_USERFULLNAME /]', category: 'data', desc: 'Full name of the executing user.', keywords: ['full name', 'display name'] },

    // --- Records Management (RM) ---
    { tag: 'RMINFO:STATUS', category: 'rm', desc: 'Get the Records Management status (Official, etc.).', keywords: ['rm status', 'official', 'record stage'] },
    { tag: 'RMINFO:CLASSID', category: 'rm', desc: 'Get the primary RM classification ID applied to a node.', keywords: ['rm classification', 'class id', 'retention'] },
    { tag: 'RMACTION:FINALIZE', category: 'rm', desc: 'Finalize a record in Records Management.', keywords: ['finalize', 'freeze record', 'lock rm'] },
    { tag: 'RMACTION:RMCLASSIFICATION:ADD:id', category: 'rm', desc: 'Add or replace an RM classification.', keywords: ['apply classification', 'set rm class'] },
    { tag: 'RMCLASS:FILENUMBER', category: 'rm', desc: 'Get the File Number of an RM Classification.', keywords: ['file number', 'rm class info'] },
    { tag: 'RMHOLDINFO:DIRECT', category: 'rm', desc: 'Get direct holds applied to a node.', keywords: ['holds', 'freeze', 'legal hold'] },
    { tag: 'RMHOLDACTION:APPLY:hold', category: 'rm', desc: 'Apply an RM hold to a node.', keywords: ['apply hold', 'legal freeze'] },
    { tag: 'RMPERMCHECK:MANAGEDOBJECT:HOLD:APPLY', category: 'rm', desc: 'Check if user can apply RM holds.', keywords: ['can hold', 'rm permission'] },
    { tag: 'RMXREFACTION:ASSIGN:dest:code', category: 'rm', desc: 'Assign an RM cross-reference to another node.', keywords: ['cross reference', 'link records'] },
    { tag: 'RSISCHEDULE:STAGE', category: 'rm', desc: 'Get the retention stage of an RSI schedule.', keywords: ['retention stage', 'rsi schedule'] },

    // --- Workflow Management ---
    { tag: 'WFACTION:SUSPEND', category: 'workflow', desc: 'Suspend an executing workflow.', keywords: ['suspend workflow', 'pause wf'] },
    { tag: 'WFACTION:RESUME', category: 'workflow', desc: 'Resume a suspended workflow.', keywords: ['resume workflow', 'start wf'] },
    { tag: 'WFACTION:STOP', category: 'workflow', desc: 'Stop an active workflow process.', keywords: ['stop workflow', 'kill process'] },
    { tag: 'WFATTR:name:DISPLAY', category: 'workflow', desc: 'Get a workflow attribute value.', keywords: ['get wf attr', 'workflow variable'] },
    { tag: 'WFINFO:TITLE', category: 'workflow', desc: 'Get the title of the workflow instance.', keywords: ['workflow title', 'wf name'] },
    { tag: 'WFINFO:STATUS', category: 'workflow', desc: 'Get the current status of the workflow.', keywords: ['workflow status', 'wf state'] },
    { tag: 'WFTASKINFO:BUTTONS', category: 'workflow', desc: 'Get disposition buttons for a workflow task.', keywords: ['task buttons', 'dispositions'] },
    { tag: 'WFTASKACTION:REASSIGN:user', category: 'workflow', desc: 'Reassign a workflow task to another user/group.', keywords: ['reassign', 'delegate', 'forward task'] },
    { tag: 'WFTASKACTION:SENDON:disposition', category: 'workflow', desc: 'Send a workflow step on with a specific disposition.', keywords: ['send on', 'complete step', 'submit task'] },
    { tag: 'SETWFATTACH:COPY', category: 'workflow', desc: 'Copy a node to workflow attachments.', keywords: ['attach node', 'workflow copy'] },
    { tag: 'SETWFATTR:name:val', category: 'workflow', desc: 'Set a workflow attribute value.', keywords: ['set workflow attribute', 'wf set'] },
    { tag: 'SETWFFORM:form:attr:val', category: 'workflow', desc: 'Populate a field in a workflow form.', keywords: ['setform', 'workflow form', 'populate field'] },
    { tag: 'SETWFCOMMENT', category: 'workflow', desc: 'Add a comment to the current workflow step.', keywords: ['add comment', 'workflow note'] },
    { tag: 'WFCOMMENTS', category: 'workflow', desc: 'Retrieve all comments for a workflow as a RecArray.', keywords: ['get comments', 'wf audit notes'] },
    { tag: 'WFESIGNINFO:CONFIG', category: 'workflow', desc: 'Get eSign configuration settings.', keywords: ['esign', 'electronic signature'] },
    { tag: 'WFFORM:form:field:DISPLAY', category: 'workflow', desc: 'Get a value from a workflow form field.', keywords: ['workflow form value', 'get form field'] },

    // --- Permissions, Roles & Security ---
    { tag: 'PERMINFO:OWNER', category: 'permission', desc: 'Get owner permission details.', keywords: ['who owns', 'owner access'] },
    { tag: 'PERMACTION:ACL:user:UPDATE:perms', category: 'permission', desc: 'Update ACL permissions for a user.', keywords: ['grant access', 'revoke', 'set permissions'] },
    { tag: 'PERMACTION:COPY:source', category: 'permission', desc: 'Copy permissions from a source node.', keywords: ['copy perms', 'inherit from'] },
    { tag: 'PERMCHECK:DELETE', category: 'permission', desc: 'Check if current user can delete the node.', keywords: ['can delete', 'check access'] },
    { tag: 'ROLEINFO:name', category: 'permission', desc: 'Get members and info for a workspace role.', keywords: ['role info', 'workspace team'] },
    { tag: 'ROLEACTION:ADD:NAME=val', category: 'permission', desc: 'Create a new role in a workspace.', keywords: ['add role', 'create team'] },
    { tag: 'SCINFO:CURRENTSECURITY:LEVEL', category: 'permission', desc: 'Get security clearance level of a node.', keywords: ['security level', 'clearance'] },
    { tag: 'SCACTION:CURRENTSECURITY:val', category: 'permission', desc: 'Set security clearance level for a node.', keywords: ['set clearance', 'change security'] },
    { tag: 'SCUSERINFO:SECURITYCLEARANCELEVEL', category: 'permission', desc: 'Get a users security clearance level.', keywords: ['user clearance', 'security profile'] },

    // --- User & Group Administration ---
    { tag: 'USERINFO:NAME', category: 'user', desc: 'Get the full name of a user.', keywords: ['user name', 'full name'] },
    { tag: 'USERINFO:EMAIL', category: 'user', desc: 'Get the email address of a user.', keywords: ['email', 'mail'] },
    { tag: 'USERACTION:CREATE:LOGIN:PASS:NAME', category: 'user', desc: 'Create a new user account.', keywords: ['add user', 'new user'] },
    { tag: 'USERINGROUP:group', category: 'user', desc: 'Check if a user is in a specific group.', keywords: ['in group', 'membership'] },
    { tag: 'GROUPINFO:MEMBERS', category: 'user', desc: 'List all members of a group.', keywords: ['group members', 'who in group'] },
    { tag: 'USERPREFACTION:SET:pref:val', category: 'user', desc: 'Set a user preference (Start Page, etc.).', keywords: ['user settings', 'preference'] },

    // --- Logic, Math & Data Utilities ---
    { tag: 'ADD:val', category: 'math', desc: 'Add a numeric value.', keywords: ['plus', 'add', 'sum'] },
    { tag: 'SUBTRACT:val', category: 'math', desc: 'Subtract a numeric value.', keywords: ['minus', 'subtract', 'difference'] },
    { tag: 'MULTIPLY:val', category: 'math', desc: 'Multiply by a numeric value.', keywords: ['multiply', 'times'] },
    { tag: 'DIVIDE:val', category: 'math', desc: 'Divide by a numeric value.', keywords: ['divide', 'ratio'] },
    { tag: 'MODULUS:val', category: 'math', desc: 'Calculate the remainder of division.', keywords: ['modulus', 'remainder'] },
    { tag: 'ROUND:dec', category: 'math', desc: 'Round a numeric value to specific decimals.', keywords: ['round', 'ceil', 'floor'] },
    { tag: 'AVERAGE:list', category: 'math', desc: 'Calculate the average of a list or RecArray column.', keywords: ['average', 'mean'] },
    { tag: 'SUM:list', category: 'math', desc: 'Calculate the sum of a list or RecArray column.', keywords: ['sum', 'total'] },
    { tag: 'MAX:list', category: 'math', desc: 'Find the maximum value in a list.', keywords: ['max', 'highest', 'top'] },
    { tag: 'MIN:list', category: 'math', desc: 'Find the minimum value in a list.', keywords: ['min', 'lowest', 'bottom'] },
    { tag: 'DECODE:match1:res1:else', category: 'logic', desc: 'Value substitution (IF-THEN-ELSE shorthand).', keywords: ['decode', 'switch', 'mapping'] },
    { tag: 'TODATE:format', category: 'date', desc: 'Convert a string to a date object.', keywords: ['parse date', 'to date'] },
    { tag: 'DATE:format', category: 'date', desc: 'Format a date using a specific mask.', keywords: ['format date', 'display date'] },
    { tag: 'TOJSON', category: 'format', desc: 'Convert an object/array to a JSON string.', keywords: ['to json', 'serialize'] },
    { tag: 'UNESCAPEJSON', category: 'format', desc: 'Unescape JSON control characters.', keywords: ['unescape', 'json clean'] },
    { tag: 'TOLIST:delim', category: 'format', desc: 'Convert a string to a list.', keywords: ['to list', 'split string'] },
    { tag: 'LIST:val1:val2', category: 'format', desc: 'Create a list from specific values.', keywords: ['create list', 'array'] },
    { tag: 'UPPER', category: 'format', desc: 'Convert text to uppercase.', keywords: ['uppercase', 'capital'] },
    { tag: 'LOWER', category: 'format', desc: 'Convert text to lowercase.', keywords: ['lowercase', 'small caps'] },
    { tag: 'TRIM', category: 'format', desc: 'Remove leading/trailing whitespace.', keywords: ['trim', 'strip space'] },
    { tag: 'SUBSTR:start:width', category: 'format', desc: 'Extract a substring by width.', keywords: ['substring', 'part of string'] },
    { tag: 'SLICE:start:end', category: 'format', desc: 'Extract a slice between indices.', keywords: ['slice', 'portion'] },
    { tag: 'LENGTH', category: 'format', desc: 'Get character count of a string.', keywords: ['length', 'size', 'count'] },
    { tag: 'REPLACE:old:new', category: 'format', desc: 'Replace specific text in a string.', keywords: ['replace', 'change text'] },
    { tag: 'STRIPHTML', category: 'format', desc: 'Remove HTML tags from a string.', keywords: ['strip html', 'plain text'] },
    { tag: 'PATFIND:regex', category: 'format', desc: 'Find a regex-like pattern.', keywords: ['pattern find', 'regex'] },
    { tag: 'PATCHANGE:old:new', category: 'format', desc: 'Replace text using pattern matching.', keywords: ['pattern change', 'smart replace'] },
    { tag: 'ESCAPEFORJS', category: 'format', desc: 'Escape string for use in JavaScript.', keywords: ['js escape', 'script safe'] },

    // --- Database & External ---
    { tag: 'RUNSQL:params', category: 'database', desc: 'Execute a LiveReport with parameters.', keywords: ['runsql', 'live report', 'query'] },
    { tag: 'WFDBLOOKUP:table:col', category: 'database', desc: 'Query WebForms database tables.', keywords: ['wfdb', 'lookup table'] },
    { tag: 'PARSECSV', category: 'database', desc: 'Parse a CSV string into a RecArray.', keywords: ['parse csv', 'read csv'] },
    { tag: 'TOXML', category: 'database', desc: 'Format data as XML.', keywords: ['to xml', 'soap'] },
    { tag: 'RUNSWR:params', category: 'integration', desc: 'Call a sub-WebReport with parameters.', keywords: ['sub webreport', 'runswr'] },
    { tag: 'RUNTEMPLATE', category: 'integration', desc: 'Execute a template using current context.', keywords: ['run template', 'layout'] },

    // --- Specialized Modules (XENG) ---
    { tag: 'XENGADN:NEXT', category: 'specialized', desc: 'Get the next number in an ADN sequence.', keywords: ['adn', 'numbering'] },
    { tag: 'XENGADNACTION:GENERATE', category: 'specialized', desc: 'Bulk generate ADN numbers.', keywords: ['adn bulk', 'generate ids'] },
    { tag: 'XENGADNACTION:LOCK', category: 'specialized', desc: 'Lock an ADN number.', keywords: ['lock adn'] },
    { tag: 'XENGADNACTION:REFER', category: 'specialized', desc: 'Reference an ADN ID for a node.', keywords: ['adn refer', 'set adn'] },
    { tag: 'XENGCAD:GETRELATIONSHIPS', category: 'specialized', desc: 'Get CAD document relationships (XREFs).', keywords: ['cad', 'xref', 'assembly'] },
    { tag: 'XENGCADACTION:XREFCONNECT', category: 'specialized', desc: 'Relate documents in CAD assembly.', keywords: ['connect cad', 'link dwg'] },
    { tag: 'XENGSFM:STATEFLOWINFO', category: 'specialized', desc: 'Get State Flow metadata for a node.', keywords: ['state flow', 'sfm info'] },
    { tag: 'XENGSFMACTION:TRANSITION', category: 'specialized', desc: 'Perform a State Flow transition.', keywords: ['transition', 'state change'] },
    { tag: 'XENGTRANSMITTAL:TRANSMITTALINFO', category: 'specialized', desc: 'Get transmittal workspace details.', keywords: ['transmittal', 'package', 'shipping'] },
    { tag: 'XENGTRANSMITTALACTION:SEND', category: 'specialized', desc: 'Send a transmittal package.', keywords: ['send transmittal', 'issue docs'] },
    { tag: 'XENGCRTACTION:CONTROL', category: 'specialized', desc: 'Convert document to controlled revision.', keywords: ['control doc', 'crt'] },
    { tag: 'XENGCRTACTION:SIGNOUT', category: 'specialized', desc: 'Sign out a controlled document for editing.', keywords: ['sign out crt', 'checkout'] },

    // --- Workflow & Forms Management ---
    { tag: 'WFACTION:SUSPEND', category: 'workflow', desc: 'Suspend an executing workflow instance.', keywords: ['suspend wf', 'pause workflow'] },
    { tag: 'WFACTION:RESUME', category: 'workflow', desc: 'Resume a suspended workflow.', keywords: ['resume wf', 'continue workflow'] },
    { tag: 'WFACTION:SETATTR:name:val', category: 'workflow', desc: 'Set a workflow attribute value externally.', keywords: ['set wf attr', 'update workflow'] },
    { tag: 'WFATTR:attname:DISPLAY', category: 'workflow', desc: 'Display a workflow attribute value.', keywords: ['get wf attr', 'show attribute'] },
    { tag: 'WFINFO:STATUS', category: 'workflow', desc: 'Get current workflow status.', keywords: ['workflow status', 'wf state'] },
    { tag: 'WFTASKACTION:REASSIGN', category: 'workflow', desc: 'Reassign a workflow step to another user.', keywords: ['reassign', 'delegate step'] },
    { tag: 'WFTASKACTION:SENDON', category: 'workflow', desc: 'Send a workflow step to the next task.', keywords: ['send on', 'complete step'] },
    { tag: 'SETWFATTACH:COPY', category: 'workflow', desc: 'Copy a node to workflow attachments.', keywords: ['workflow attach', 'copy to wf'] },
    { tag: 'SETWFATTR:attname', category: 'workflow', desc: 'Set a workflow attribute in destination.', keywords: ['set workflow attribute'] },
    { tag: 'SETWFFORM:form:attr', category: 'workflow', desc: 'Populate a workflow form field.', keywords: ['set workflow form', 'fill form'] },
    { tag: 'WFDBLOOKUP:table:col', category: 'workflow', desc: 'Lookup data from WebForm database tables.', keywords: ['form lookup', 'db lookup'] },

    // --- User & Group Administration ---
    { tag: 'USERACTION:CREATE', category: 'users', desc: 'Create a new Content Server user or group.', keywords: ['create user', 'add member'] },
    { tag: 'USERACTION:UPDATE', category: 'users', desc: 'Update user privileges or metadata.', keywords: ['update user', 'modify account'] },
    { tag: 'USERINFO:FULLNAME', category: 'users', desc: 'Get full name of a user.', keywords: ['user name', 'full name'] },
    { tag: 'USERINFO:PRIVILEGES', category: 'users', desc: 'Check user administrative rights.', keywords: ['user perms', 'admin check'] },
    { tag: 'USERINGROUP', category: 'users', desc: 'Verify if a user belongs to a specific group.', keywords: ['is member', 'group check'] },
    { tag: 'USERPREF:GENERAL:DFTSTARTPAGE', category: 'users', desc: 'Get user default home page.', keywords: ['user start page', 'home preference'] },
    { tag: 'USERPREFACTION:GENERAL:STARTPAGE', category: 'users', desc: 'Set user default home page.', keywords: ['set start page', 'update home'] },

    // --- Node & Version Management ---
    { tag: 'VERINFO:MIMETYPE', category: 'node', desc: 'Get the MIME type of a node version.', keywords: ['file type', 'mimetype'] },
    { tag: 'VERINFO:VERSION', category: 'node', desc: 'Get version label (e.g., 1.2).', keywords: ['version number', 'label'] },
    { tag: 'VERSIONACTION:LOCK', category: 'node', desc: 'Lock a specific version.', keywords: ['lock version'] },
    { tag: 'VERSIONCAT:cat:attr:DISPLAY', category: 'node', desc: 'Get category value for a specific version.', keywords: ['version cat', 'historical metadata'] },
    { tag: 'SETSHAREEXPIRY', category: 'node', desc: 'Update the expiry date for a shared node.', keywords: ['share expire', 'link timeout'] },
    { tag: 'TABS', category: 'node', desc: 'Get functional menu tabs for a node.', keywords: ['node tabs', 'properties menu'] },

    // --- Audit & Compliance ---
    { tag: 'AUDITINFO:col', category: 'audit', desc: 'Get details from the most recent Audit Event.', keywords: ['audit info', 'compliance'] },
    { tag: 'AUDITACTION:NODE:val', category: 'audit', desc: 'Log a custom audit event for a node.', keywords: ['audit log', 'track action'] },

    // --- Business Workspaces (xECM) ---
    { tag: 'WKSPINFO:RELATION:CHILD', category: 'specialized', desc: 'Get related child workspaces.', keywords: ['sub workspace', 'linked wksp'] },
    { tag: 'WKSPACTION:RELATION:ADD', category: 'specialized', desc: 'Link a child workspace.', keywords: ['link workspace', 'add relation'] },
    { tag: 'BOINFO:WKSPNODEID', category: 'specialized', desc: 'Get Workspace Node ID for a Business Object.', keywords: ['bo info', 'workspace node'] },

    // --- Utilities & Conversion ---
    { tag: 'TOJSON', category: 'logic', desc: 'Convert OScript structures to JSON.', keywords: ['to json', 'javascript data'] },
    { tag: 'TOLIST:sep', category: 'logic', desc: 'Convert delimited string to a List.', keywords: ['to list', 'split string'] },
    { tag: 'VALUES', category: 'logic', desc: 'Extract values from an Assoc or Record into a List.', keywords: ['assoc values', 'record to list'] },
    { tag: 'XLATE', category: 'logic', desc: 'Translate a system string (Localization).', keywords: ['translate', 'localise', 'xlate'] },
    { tag: 'TIMESINCE', category: 'logic', desc: 'Calculate readable time delta between dates.', keywords: ['time since', 'ago', 'duration'] },
    { tag: 'STRIPHTML', category: 'logic', desc: 'Remove HTML tags from a string.', keywords: ['clean html', 'text only'] },
    { tag: 'SECURETOKEN', category: 'logic', desc: 'Generate a secure request token for actions.', keywords: ['token', 'security key'] },
    { tag: 'URLTOPOST', category: 'logic', desc: 'Convert GET URL parameters to POST hidden inputs.', keywords: ['url to post', 'form security'] },
    { tag: 'BITCHECK:mask', category: 'logic', desc: 'Test if specific binary bits are set.', keywords: ['bit check', 'binary', 'mask'] }
];

const COMPLEX_SCENARIOS = [
    {
        intent: 'permission check',
        primary: 'permission',
        keywords: ['access', 'check', 'button', 'show if', 'perm'],
        code: `[LL_WEBREPORT_IF "[LL_REPTAG=DATAID PERMCHECK:DELETE /]" == "TRUE" /]\n  <button>Delete Node</button>\n[LL_WEBREPORT_ENDIF /]`,
        desc: 'Conditionally show a button or execute code only if the user has specific permissions (e.g., DELETE).'
    },
    {
        intent: 'create folder',
        primary: 'create',
        keywords: ['folder', 'folder id', 'new', 'add folder'],
        code: `[LL_REPTAG_!ParentID NODEACTION:CREATE:FOLDER:!ParentID:"{NAME}":UNIQUEONLY SETVAR:FolderID /]`,
        desc: 'Ensure a folder exists in a parent container (creates if missing, returns ID if exists).'
    },
    {
        intent: 'loop and format',
        primary: 'loop',
        keywords: ['format', 'list', 'each', 'iterate'],
        code: `[LL_WEBREPORT_FOR DATA:[LL_REPTAG_DATASOURCE /] VAR:row /]\n  [LL_REPTAG_%row CURRENTVAL RECORD:NAME UPPER /] - [LL_REPTAG_%row CURRENTVAL RECORD:CREATEDATE DATE:"%Y" /]\n[LL_WEBREPORT_ENDFOR /]`,
        desc: 'Iterate through all rows and display the uppercase name and year created.'
    },
    {
        intent: 'rest api call',
        primary: 'rest',
        keywords: ['api', 'call', 'json', 'external', 'http'],
        code: `[LL_WEBREPORT_RESTCLIENT\n@HOST:'api.example.com'\n@URI:'/v1/data'\n@METHOD:GET\n@RESPONSE:apiRes /]\n[LL_REPTAG_!apiRes ASSOC:content FROMJSON SETVAR:jsonData /]`,
        desc: 'Make a REST call and parse the JSON response into a variable.'
    },
    {
        intent: 'assign permission',
        primary: 'assign',
        keywords: ['permission', 'set', 'grant', 'acl', 'user', 'folder', 'perm'],
        code: `[LL_REPTAG_{NODE_ID} PERMACTION:ACL:{USER_ID}:UPDATE:"SEE,SEECONTENTS,MODIFY" /]`,
        desc: 'Assign specific permissions to a user on a specific node.'
    },
    {
        intent: 'copy document',
        primary: 'copy',
        keywords: ['duplicate', 'clone', 'folder', 'id'],
        code: `[LL_REPTAG_{NODE_ID} NODEACTION:COPY:{DEST_ID} /]`,
        desc: 'Copy a document or folder to a destination container.'
    },
    {
        intent: 'move document',
        primary: 'move',
        keywords: ['relocate', 'transfer', 'destination', 'folder'],
        code: `[LL_REPTAG_{NODE_ID} NODEACTION:MOVE:{DEST_ID} /]`,
        desc: 'Move a document or folder to a new parent container.'
    },
    {
        intent: 'delete node',
        primary: 'delete',
        keywords: ['remove', 'trash', 'destroy', 'purge'],
        code: `[LL_REPTAG_{NODE_ID} NODEACTION:DELETE /]`,
        desc: 'Delete a Content Server node permanently.'
    },
    {
        intent: 'rename node',
        primary: 'rename',
        keywords: ['rename', 'change name', 'set name'],
        code: `[LL_REPTAG_{NODE_ID} NODEACTION:RENAME:"{NAME}" /]`,
        desc: 'Rename a Content Server node.'
    },
    {
        intent: 'create folder and add document',
        primary: 'attach',
        keywords: ['create', 'folder', 'add', 'document', 'attach', 'attachment', 'upload'],
        code: `[LL_REPTAG_{NODE_ID} NODEACTION:CREATE:FOLDER:{NODE_ID}:"{NAME}":UNIQUEONLY SETVAR:FldID /]\n[LL_REPTAG_!FldID NODEACTION:CREATE:DOC:!FldID:"UploadedFile.dat":UNIQUEONLY SETVAR:DocID /]\n[LL_REPTAG_!DocID NODEACTION:ADDVER:!FILES /]`,
        desc: 'Ensure a folder exists, create a document inside it, and add a version from an attachment.'
    },
    {
        intent: 'set workflow form',
        primary: 'setform',
        keywords: ['form', 'workflow', 'populate', 'field', 'attribute'],
        code: `[LL_REPTAG_!WorkID SETWFFORM:FormName:FieldName:"Value" /]`,
        desc: 'Populate a field in a workflow form.'
    },
    {
        intent: 'update category attribute',
        primary: 'setvalue',
        keywords: ['attribute', 'category', 'set', 'update', 'metadata', 'cataction'],
        code: `[LL_REPTAG_{NODE_ID} CATACTION:SETVALUE:"{CAT_NAME}":"{ATTR_NAME}":"{VALUE}" /]`,
        desc: 'Set the value of a specific attribute within a category for a node.'
    }
];

// --- Contextual Memory ---
let lastSystemResponse = null;

// ADVANCED LOGIC: Entity Extraction & Combinatorial Intent Scoring
async function generateResponse(query, hasAttachments = false) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const q = query.toLowerCase();

    // --- 0. Handle Contextual Follow-up ---
    const followUpTokens = ["explain", "what does", "describe", "detail", "how", "change", "update", "modify"];
    const isFollowUp = followUpTokens.some(token => q.includes(token));

    if (isFollowUp && lastSystemResponse && !lastSystemResponse.error) {
        if (q.includes("explain") || q.includes("what does") || q.includes("detail")) {
            return {
                text: `The previously generated code performs a **${lastSystemResponse.intent || 'specific WebReport operation'}**. 
                \n\n**Technical Details:**
                \n- It uses the tag: \`${lastSystemResponse.code.split(' ')[1] || lastSystemResponse.code}\`
                \n- **Description:** ${lastSystemResponse.fullDesc || "No further details available."}
                \n\nIs there anything specific you'd like to change?`,
                code: lastSystemResponse.code
            };
        }
    }

    // --- Deep Entity Extraction ---
    const nodeIds = q.match(/\b\d{4,}\b/g) || [];
    const quotedMatch = [...query.matchAll(/["']([^"']+)["']/g)];
    const quoted = quotedMatch.map(m => m[1]);

    const entities = {
        nodeId: nodeIds[0] || "DATAID",
        destId: nodeIds[1] || "2000",
        userId: nodeIds[0] || "1000",
        name: quoted[0] || "New Name",
        cat: "CategoryName",
        attr: "AttributeName",
        val: "NewValue"
    };

    // Contextual Role Assignment for Quoted Strings
    if (quoted.length > 0) {
        quotedMatch.forEach((m, i) => {
            const str = m[1];
            const lowerStr = str.toLowerCase();
            const pos = m.index;
            const around = q.substring(Math.max(0, pos - 20), Math.min(q.length, pos + str.length + 20));

            if (around.includes("category") || around.includes("cat")) entities.cat = str;
            else if (around.includes("attribute") || around.includes("attr")) entities.attr = str;
            else if (around.includes("value") || around.includes(" to ") || around.includes("=")) entities.val = str;
            else if (i === 0) entities.name = str;
        });
    }

    const tokens = q.split(/\s+/).filter(t => t.length > 2);

    // --- 1. Identify Scenarios ---
    let scenarioMatches = COMPLEX_SCENARIOS.map(s => {
        let score = 0;

        // Primary Intent Match (High Weight)
        if (s.primary && q.includes(s.primary)) score += 50;

        // Keyword Match
        s.keywords.forEach(k => {
            if (q.includes(k)) score += 5;
            if (k.length > 5 && (q.includes(k.substring(0, 5)) || k.includes(q.substring(0, 5)))) score += 2;
        });

        // Boost for attachment context
        if (hasAttachments && s.keywords.includes('attachment')) score += 30;

        // Negative Constraints (prevent 'create' from winning if 'copy'/'move' is primary)
        if (s.primary === 'create' && (q.includes('copy') || q.includes('move') || q.includes('rename'))) {
            // Only penalize if it's NOT a sequential query
            if (!q.includes('then') && !q.includes('and') && !q.includes('after') && !q.includes('once')) {
                score -= 60;
            }
        }

        // Exact Match Boost for Scenario Primary
        if (tokens.includes(s.primary.toLowerCase())) {
            score += 30;
        }

        return { ...s, score };
    }).filter(s => s.score >= 25).sort((a, b) => b.score - a.score);

    // --- 2. Build Combinatorial Response ---
    if (scenarioMatches.length > 0) {
        // Deduplicate intents and limit to 2 distinct matches
        let matchesToUse = [];
        const seenIntents = new Set();

        const isSequential = (q.includes('and') || q.includes('then') || q.includes('after') || q.includes('once'));

        for (const s of scenarioMatches) {
            if (!seenIntents.has(s.intent)) {
                matchesToUse.push(s);
                seenIntents.add(s.intent);
            }
            if (matchesToUse.length >= (isSequential ? 2 : 1)) break;
        }

        let combinedCode = "";
        let combinedDesc = [];

        matchesToUse.forEach((match, index) => {
            let snippet = match.code;

            // Parameter Injection
            snippet = snippet.replace(/{NODE_ID}/g, entities.nodeId)
                .replace(/{DEST_ID}/g, entities.destId)
                .replace(/{USER_ID}/g, entities.userId)
                .replace(/{NAME}/g, entities.name)
                .replace(/{CAT_NAME}/g, entities.cat)
                .replace(/{ATTR_NAME}/g, entities.attr)
                .replace(/{VALUE}/g, entities.val);

            combinedCode += (index > 0 ? "\n\n" : "") + snippet;
            combinedDesc.push(match.intent);
        });

        const response = {
            text: `I've interpreted your request as a **${combinedDesc.join(' and ')}** sequence. Here is the generated WebReport logic:`,
            code: combinedCode,
            intent: combinedDesc.join(' and '),
            fullDesc: matchesToUse.map(m => m.desc).join(' Then ')
        };
        lastSystemResponse = response;
        return response;
    }

    // --- 3. Tag Matching (Individual) ---
    let tagMatches = KNOWLEDGE_BASE.map(t => {
        let score = 0;

        // Exact Tag Name Match (High Priority)
        const tagParts = t.tag.split(/[:\[\]_ ]/);
        tokens.forEach(token => {
            if (tagParts.some(p => p.toLowerCase() === token)) score += 50;
            if (t.tag.toLowerCase().includes(token) || token.includes(t.tag.toLowerCase().replace(/:/g, ''))) score += 15;
            if (t.desc.toLowerCase().includes(token)) score += 35; // Significant boost for description match
            t.keywords.forEach(k => {
                if (token === k || q.includes(k)) score += 20;
            });
        });

        // Priority boost based on specific action verbs and tag presence
        if (q.includes("copy") && (t.tag.includes("COPY") || t.tag.includes("NODEACTION"))) score += 40;
        if (q.includes("move") && (t.tag.includes("MOVE") || t.tag.includes("NODEACTION"))) score += 40;
        if (q.includes("delete") && (t.tag.includes("DELETE") || t.tag.includes("NODEACTION"))) score += 40;
        if (q.includes("rename") && (t.tag.includes("RENAME") || t.tag.includes("NODEACTION"))) score += 40;
        if (q.includes("permission") && (t.category === "permission" || t.tag.includes("PERM"))) score += 30;

        return { ...t, score };
    }).filter(t => t.score > 20).sort((a, b) => b.score - a.score);

    if (tagMatches.length > 0) {
        const best = tagMatches[0];
        let code = best.tag;

        if (!code.startsWith('[') && !code.includes('[')) {
            code = `[LL_REPTAG=${entities.nodeId} ${best.tag} /]`;
        }

        // Apply Entity Injection to Individual Tags too
        code = code.replace(/{CAT_NAME}/g, entities.cat)
            .replace(/{ATTR_NAME}/g, entities.attr)
            .replace(/{VALUE}/g, entities.val);

        const response = {
            text: `I've identified the specific WebReport operation for **${best.desc}**:`,
            code: code,
            intent: best.desc,
            fullDesc: best.desc
        };
        lastSystemResponse = response;
        return response;
    }

    return {
        error: true,
        text: "I couldn't map your query to a specific WebReport operation. Please ensure you use clear action verbs like 'copy', 'move', 'create', or 'rename'."
    };
}

// UI LOGIC
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const suggestionBtns = document.querySelectorAll('.suggest-btn');
const attachBtn = document.getElementById('attach-btn');
const fileInput = document.getElementById('file-input');
const attachmentPreview = document.getElementById('attachment-preview');

let attachments = [];
let messages = []; // Used only for session memory, not persisted

if (attachBtn) {
    attachBtn.addEventListener('click', () => fileInput.click());
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (!attachments.find(a => a.name === file.name)) {
                attachments.push({ name: file.name, type: file.type });
                renderAttachmentChip(file);
            }
        });
        fileInput.value = '';
    });
}

function renderAttachmentChip(file) {
    const chip = document.createElement('div');
    chip.className = 'attachment-chip';
    chip.innerHTML = `
        <span>${file.name}</span>
        <span class="remove-attachment" onclick="removeAttachment('${file.name}')">&times;</span>
    `;
    attachmentPreview.appendChild(chip);
}

window.removeAttachment = (name) => {
    attachments = attachments.filter(a => a.name !== name);
    const chips = attachmentPreview.querySelectorAll('.attachment-chip');
    chips.forEach(chip => {
        if (chip.querySelector('span').textContent === name) {
            chip.remove();
        }
    });
};

userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
});

async function handleSend() {
    const query = userInput.value.trim();
    if (!query && attachments.length === 0) return;

    const currentAttachments = [...attachments];
    attachments = [];
    attachmentPreview.innerHTML = '';

    userInput.value = '';
    userInput.style.height = 'auto';

    addMessage(query, 'user', null, currentAttachments);
    const typingId = addTypingIndicator();

    try {
        const response = await generateResponse(query, currentAttachments.length > 0);
        removeTypingIndicator(typingId);
        addMessage(response.text, response.error ? 'system error' : 'system', response.code);
    } catch (error) {
        console.error(error);
        removeTypingIndicator(typingId);
        addMessage("Sorry, I encountered an error processing your request.", 'system error');
    }
}

if (sendBtn) sendBtn.addEventListener('click', handleSend);
if (userInput) {
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
}

suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        userInput.value = btn.textContent;
        handleSend();
    });
});

function addMessage(text, type, code = null, attachedFiles = []) {
    messages.push({ text, type, code, attachedFiles });
    renderMessage(text, type, code, attachedFiles);
}

function renderMessage(text, type, code = null, attachedFiles = []) {
    const messageDiv = document.createElement('div');
    const isError = type.includes('error');
    messageDiv.className = `message ${type}`;
    const avatar = type === 'user' ? '👤' : (isError ? '⚠️' : '🤖');

    let contentHtml = text ? `<p>${text}</p>` : '';

    if (attachedFiles.length > 0) {
        contentHtml += `<div class="attached-files">`;
        attachedFiles.forEach(file => {
            contentHtml += `
                <div class="file-pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>${file.name}</span>
                </div>`;
        });
        contentHtml += `</div>`;
    }

    if (code) {
        const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
        contentHtml += `
            <div class="code-container">
                <div class="code-title">
                    <span>WebReport Code</span>
                    <button class="copy-btn" onclick="copyCode('${codeId}')">Copy</button>
                </div>
                <pre class="language-sql"><code id="${codeId}">${escapeHtml(code)}</code></pre>
            </div>
        `;
    }

    messageDiv.innerHTML = `<div class="avatar">${avatar}</div><div class="content">${contentHtml}</div>`;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    if (code && window.Prism) Prism.highlightAll();
}

function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'message system';
    typingDiv.innerHTML = `<div class="avatar">🤖</div><div class="content"><p>Thinking...</p></div>`;
    chatHistory.appendChild(typingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

window.copyCode = (id) => {
    const codeElement = document.getElementById(id);
    const text = codeElement.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector(`[onclick="copyCode('${id}')"]`);
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = originalText; }, 2000);
        }
    });
};


