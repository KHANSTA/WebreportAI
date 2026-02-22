/**
 * Advanced WebReport AI Knowledge Base & Scoring Logic
 */

const KNOWLEDGE_BASE = [
    // --- Content Control Tags ---
    { tag: '[LL_WEBREPORT_IF "A" == "B" /]...[LL_WEBREPORT_ENDIF /]', category: 'logic', desc: 'Execute code conditionally based on a logical expression.', keywords: ['if', 'condition', 'check', 'logical', 'else', 'elseif'] },
    { tag: '[LL_WEBREPORT_FOR DATA:collection VAR:v /]...[LL_WEBREPORT_ENDFOR /]', category: 'logic', desc: 'Loop over a collection (List, RecArray, etc.).', keywords: ['loop', 'for each', 'repeat', 'iterate', 'collection'] },
    { tag: '[LL_WEBREPORT_RESTCLIENT @HOST:"..." @URI:"..." @METHOD:GET /]', category: 'integration', desc: 'Make an external REST API call.', keywords: ['rest', 'api', 'http', 'get', 'post', 'client', 'external'] },
    { tag: '[LL_WEBREPORT_SQL QUERY:"..." /]', category: 'database', desc: 'Execute a SQL query against the database.', keywords: ['sql', 'query', 'database', 'db', 'runsql', 'select'] },
    { tag: '[LL_WEBREPORT_INCLUDEIF "A" == "B" /]', category: 'logic', desc: 'Include or exclude an entire row based on a condition.', keywords: ['include if', 'filter row', 'row condition'] },
    { tag: '[LL_WEBREPORT_EXITIF "A" == "B" /]', category: 'logic', desc: 'Stop processing rows immediately when a condition is met.', keywords: ['exit if', 'stop loop', 'break rows'] },
    { tag: '[LL_WEBREPORT_SORT "COLUMN":ASC /]', category: 'logic', desc: 'Sort the result set by a specific column.', keywords: ['sort', 'order', 'alphabetical', 'ascending', 'descending'] },

    // --- Data Tags ---
    { tag: '[LL_REPTAG=COLUMN /]', category: 'data', desc: 'Output data from a specific column in the data source.', keywords: ['column', 'field', 'data', 'output field'] },
    { tag: '[LL_REPTAG_&PARM /]', category: 'params', desc: 'Retrieve a parameter value from the URL or prompts.', keywords: ['parameter', 'url', 'input', 'parm', 'argument'] },
    { tag: '[LL_REPTAG_$CONST /]', category: 'params', desc: 'Retrieve a pre-defined constant value.', keywords: ['constant', 'fixed value', 'settings'] },
    { tag: '[LL_REPTAG_%VAR /]', category: 'params', desc: 'Retrieve a value from a variable (SETVAR, ADDVAR).', keywords: ['variable', 'var', 'store', 'retrieve'] },
    { tag: '[LL_REPTAG_!VAR /]', category: 'params', desc: 'Shortcut for current value of a variable.', keywords: ['bang', 'current variable', 'shorthand'] },

    // --- Node Info ---
    { tag: 'NODEINFO:NAME', category: 'node', desc: 'Get the name/title of a node.', keywords: ['name', 'title', 'node name'] },
    { tag: 'NODEINFO:PARENTID', category: 'node', desc: 'Get the ID of the parent container.', keywords: ['parent', 'folder id', 'location id'] },
    { tag: 'NODEINFO:SUBTYPE', category: 'node', desc: 'Get the node subtype (e.g., 144 for document).', keywords: ['subtype', 'type id', 'kind'] },
    { tag: 'NODEINFO:CREATEDATE', category: 'node', desc: 'Get the creation date of the node.', keywords: ['creation date', 'created on', 'when created'] },
    { tag: 'NODEINFO:OWNERID', category: 'node', desc: 'Get the user ID of the node owner.', keywords: ['owner', 'creator id'] },

    // --- User Info ---
    { tag: 'USERINFO:NAME', category: 'user', desc: 'Get the full name of a user.', keywords: ['user name', 'full name', 'real name'] },
    { tag: 'USERINFO:EMAIL', category: 'user', desc: 'Get the email address of a user.', keywords: ['email', 'mail', 'address'] },
    { tag: 'USERINGROUP', category: 'user', desc: 'Check if a user belongs to a specific group.', keywords: ['member', 'in group', 'belongs to'] },
    { tag: 'DMEMBERSHIP', category: 'user', desc: 'Get direct group memberships.', keywords: ['direct groups', 'group list'] },
    { tag: 'IMEMBERSHIP', category: 'user', desc: 'Get all (including nested) group memberships.', keywords: ['all groups', 'nested groups', 'permissions'] },

    // --- String/Formatting ---
    { tag: 'UPPER', category: 'format', desc: 'Convert text to all uppercase.', keywords: ['uppercase', 'capital'] },
    { tag: 'LOWER', category: 'format', desc: 'Convert text to all lowercase.', keywords: ['lowercase', 'small caps'] },
    { tag: 'CAPITALIZE', category: 'format', desc: 'Capitalize the first letter of each word.', keywords: ['capitalize', 'title case'] },
    { tag: 'LENGTH', category: 'format', desc: 'Return the number of characters in a string.', keywords: ['length', 'size', 'character count'] },
    { tag: 'SUBSTR:start:length', category: 'format', desc: 'Extract a portion of a string.', keywords: ['substring', 'slice', 'part of string'] },
    { tag: 'ESCAPEHTML', category: 'format', desc: 'Escape characters for HTML (e.g., < to &lt;).', keywords: ['escape html', 'safe html', 'xss'] },
    { tag: 'ESCAPEURL', category: 'format', desc: 'URL encode characters.', keywords: ['url encode', 'uri escape'] },
    { tag: 'ESCAPEJSON', category: 'format', desc: 'Escape characters for JSON strings.', keywords: ['json encode', 'serialize json'] },
    { tag: 'DECODE:if:then:else', category: 'logic', desc: 'Value substitution (IF-THEN-ELSE shorthand).', keywords: ['decode', 'switch', 'map values'] },

    // --- Date/Math ---
    { tag: "DATE:'%d-%m-%Y'", category: 'date', desc: 'Format a date using mask.', keywords: ['format date', 'display date'] },
    { tag: 'TODATE', category: 'date', desc: 'Convert a string to a WebReport date object.', keywords: ['to date', 'parse date', 'convert date'] },
    { tag: 'DATEINC:val:units', category: 'date', desc: 'Increment a date by units (DAYS, WEEKS).', keywords: ['add days', 'increment date', 'future date'] },
    { tag: 'DATEDEC:val:units', category: 'date', desc: 'Decrement a date by units.', keywords: ['subtract days', 'decrement date', 'past date'] },
    { tag: 'DATEDIFF:ref:units', category: 'date', desc: 'Calculate the difference between two dates.', keywords: ['date diff', 'days between', 'time span'] },
    { tag: 'ADD', category: 'math', desc: 'Add a value.', keywords: ['add', 'plus', 'sum'] },
    { tag: 'SUBTRACT', category: 'math', desc: 'Subtract a value.', keywords: ['minus', 'subtract', 'difference'] },
    { tag: 'MULTIPLY', category: 'math', desc: 'Multiply a value.', keywords: ['multiply', 'times'] },
    { tag: 'DIVIDE', category: 'math', desc: 'Divide a value.', keywords: ['divide', 'ratio'] },

    // --- Category/Attribute ---
    { tag: 'CAT:name:attr:DISPLAY', category: 'metadata', desc: 'Display a category attribute value.', keywords: ['category', 'attribute', 'metadata', 'get value'] },
    { tag: 'CATACTION:SETVALUE:cat:attr:val', category: 'metadata', desc: 'Set a category attribute value.', keywords: ['set category', 'update metadata', 'write attribute'] },
    { tag: 'CATINFO:DEFINITION', category: 'metadata', desc: 'Get the schema definition of a category.', keywords: ['category schema', 'attribute list', 'definition'] },

    // --- Actions ---
    { tag: 'NODEACTION:CREATE:parent:type:name', category: 'action', desc: 'Programmatically create a new node.', keywords: ['create node', 'add folder', 'new item'] },
    { tag: 'NODEACTION:DELETE', category: 'action', desc: 'Delete the node.', keywords: ['delete node', 'remove item'] },
    { tag: 'NODEACTION:COPY:dest', category: 'action', desc: 'Copy a node to a destination.', keywords: ['copy node', 'duplicate'] },
    { tag: 'NODEACTION:MOVE:dest', category: 'action', desc: 'Move a node to a destination.', keywords: ['move node', 'relocate'] },
    { tag: 'AUDITACTION:NODE:msg', category: 'action', desc: 'Log a custom event in the audit trail.', keywords: ['audit', 'log event', 'history'] },

    // --- Permissions ---
    { tag: 'PERMCHECK:action', category: 'permission', desc: 'Check if a user has specific permissions (SEE, EDIT, DELETE, etc.).', keywords: ['permission', 'access', 'check', 'perm', 'has', 'can', 'see', 'edit', 'delete'] },
    { tag: 'PERMACTION:ACL:userID:UPDATE:perms', category: 'permission', desc: 'Modify object permissions (ACL, OWNER, PUBLIC).', keywords: ['permission', 'access', 'grant', 'revoke', 'assign', 'set', 'acl', 'owner', 'public', 'update'] },
    { tag: 'PERMINFO', category: 'permission', desc: 'Retrieve detailed permission information for a node.', keywords: ['permission', 'info', 'who', 'access', 'owner'] },
    { tag: 'PERMTOASSOC', category: 'permission', desc: 'Convert a permission bitmask into a readable Assoc structure.', keywords: ['permission', 'bitmask', 'assoc', 'convert', 'read'] },

    // --- Records Management (RM) ---
    { tag: 'RMACTION:ADDHOLD:hold:reason', category: 'rm', desc: 'Apply a Records Management hold to a node.', keywords: ['rm hold', 'freeze', 'legal hold'] },
    { tag: 'RM_CLASSIFICATION', category: 'rm', desc: 'Get the RM classification of a node.', keywords: ['classification', 'retention'] },
    { tag: 'RMINFO:STatus', category: 'rm', desc: 'Get the status of a record.', keywords: ['record status', 'is official'] },

    // --- Workflow ---
    { tag: 'WFACTION:COMPLETE:taskID', category: 'workflow', desc: 'Programmatically complete a workflow task.', keywords: ['complete task', 'finish workflow'] },
    { tag: 'SETWFATTR:attr:val', category: 'workflow', desc: 'Set a workflow attribute value.', keywords: ['workflow attribute', 'wf attr'] },
    { tag: 'WFINFO:workID', category: 'workflow', desc: 'Get information about a workflow instance.', keywords: ['workflow info', 'process status'] },

    // --- Specialized Modules ---
    { tag: 'XENGADN:NEXT', category: 'specialized', desc: 'Get the next number from an ADN sequence.', keywords: ['adn', 'numbering', 'sequence'] },
    { tag: 'XENGSFM:STATE', category: 'specialized', desc: 'Get the current state in a State Flow.', keywords: ['state flow', 'sfm', 'current state'] },

    // --- Advanced Tools ---
    { tag: 'RUNSQL:reportID:params', category: 'database', desc: 'Execute a LiveReport and get results.', keywords: ['live report', 'run sql', 'query results'] },
    { tag: 'TOJSON', category: 'format', desc: 'Convert a RecArray or Assoc to a JSON string.', keywords: ['json', 'serialize', 'tojson'] },
    { tag: 'FROMJSON', category: 'format', desc: 'Parse a JSON string into a WebReport object.', keywords: ['json', 'deserialize', 'fromjson'] }
];

const COMPLEX_SCENARIOS = [
    {
        intent: 'permission check',
        keywords: ['permission', 'access', 'check', 'button', 'show if'],
        code: `[LL_WEBREPORT_IF "[LL_REPTAG=DATAID PERMCHECK:DELETE /]" == "TRUE" /]\n  <button>Delete Node</button>\n[LL_WEBREPORT_ENDIF /]`,
        desc: 'Conditionally show a button or execute code only if the user has specific permissions (e.g., DELETE).'
    },
    {
        intent: 'create folder',
        keywords: ['create', 'folder', 'folder id', 'new'],
        code: `[LL_REPTAG_!ParentID NODEINFO:CHILDREN FILTER:'"name" == "NewFolderName"' PLUCK:'dataid' LIST:1 SETVAR:FolderID /]\n[LL_WEBREPORT_IF "[LL_REPTAG_!FolderID /]" == "" /]\n  [LL_REPTAG_!ParentID NODEACTION:CREATE:0:"NewFolderName" SETVAR:FolderID /]\n[LL_WEBREPORT_ENDIF /]`,
        desc: 'Check if a folder exists in a parent, and create it if it does not.'
    },
    {
        intent: 'loop and format',
        keywords: ['loop', 'format', 'list', 'each'],
        code: `[LL_WEBREPORT_FOR DATA:[LL_REPTAG_DATASOURCE /] VAR:row /]\n  [LL_REPTAG_%row CURRENTVAL RECORD:NAME UPPER /] - [LL_REPTAG_%row CURRENTVAL RECORD:CREATEDATE DATE:"%Y" /]\n[LL_WEBREPORT_ENDFOR /]`,
        desc: 'Iterate through all rows and display the uppercase name and year created.'
    },
    {
        intent: 'rest api call',
        keywords: ['rest', 'api', 'call', 'json', 'external'],
        code: `[LL_WEBREPORT_RESTCLIENT\n@HOST:'api.example.com'\n@URI:'/v1/data'\n@METHOD:GET\n@RESPONSE:apiRes /]\n[LL_REPTAG_!apiRes ASSOC:content FROMJSON SETVAR:jsonData /]`,
        desc: 'Make a REST call and parse the JSON response into a variable.'
    },
    {
        intent: 'assign permission',
        keywords: ['assign', 'permission', 'set', 'grant', 'acl', 'user', 'folder'],
        code: `[LL_REPTAG_2000 PERMACTION:ACL:1000:UPDATE:"SEE,SEECONTENTS,MODIFY" /]`,
        desc: 'Assign specific permissions (See, See Contents, Modify) to a user (ID 1000) on a node (ID 2000).'
    }
];

async function generateResponse(query) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const q = query.toLowerCase();
    const tokens = q.split(/\s+/).filter(t => t.length > 2);

    // --- 1. Score Complex Scenarios ---
    let scenarioMatches = COMPLEX_SCENARIOS.map(s => {
        let score = 0;
        s.keywords.forEach(k => {
            if (q.includes(k)) score += 5;
            if (k.length > 5 && (q.includes(k.substring(0, 5)) || k.includes(q.substring(0, 5)))) score += 2;
        });
        if (q.includes(s.intent)) score += 10;
        return { ...s, score };
    }).filter(s => s.score > 3).sort((a, b) => b.score - a.score);

    if (scenarioMatches.length > 0 && scenarioMatches[0].score >= 8) {
        const best = scenarioMatches[0];
        return {
            text: `I found a matching scenario for **${best.intent}**. This logic will **${best.desc}**:`,
            code: best.code
        };
    }

    // --- 2. Score Individual Tags ---
    let tagMatches = KNOWLEDGE_BASE.map(t => {
        let score = 0;
        tokens.forEach(token => {
            if (t.tag.toLowerCase().includes(token)) score += 10;
            if (t.desc.toLowerCase().includes(token)) score += 5;
            t.keywords.forEach(k => {
                if (token === k) score += 8;
                else if (token.includes(k) || k.includes(token)) score += 3;
            });
        });

        if ((q.includes("permision") || q.includes("permission")) && t.category === "permission") score += 15;

        return { ...t, score };
    }).filter(t => t.score > 0).sort((a, b) => b.score - a.score);

    if (tagMatches.length > 0) {
        const best = tagMatches[0];
        let code = best.tag;
        if (!code.startsWith('[') && !code.includes('[')) {
            code = `[LL_REPTAG=DATAID ${best.tag} /]`;
        }
        return {
            text: `I've found the relevant WebReport tag for **${best.desc}**:`,
            code: code
        };
    }

    return {
        text: "I couldn't find a precise match. Please try specifying if you want to 'create', 'move', 'delete', or change 'permissions'. Here's a generic example using **NODEINFO**:",
        code: `[LL_REPTAG=DATAID NODEINFO:NAME /]`
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

if (attachBtn) {
    attachBtn.addEventListener('click', () => fileInput.click());
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (!attachments.find(a => a.name === file.name)) {
                attachments.push(file);
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
        const response = await generateResponse(query);
        removeTypingIndicator(typingId);
        addMessage(response.text, 'system', response.code);
    } catch (error) {
        console.error(error);
        removeTypingIndicator(typingId);
        addMessage("Sorry, I encountered an error processing your request.", 'system');
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
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    const avatar = type === 'user' ? '👤' : '🤖';

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
