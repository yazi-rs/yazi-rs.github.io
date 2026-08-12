import React from "react";
import CodeBlock from '@theme/CodeBlock';
import {useLocation} from "@docusaurus/router";
import {parse} from "toml";

import yazi from "!!raw-loader!./yazi-default.toml";
import keymap from "!!raw-loader!./keymap-default.toml";
import themeLight from "raw-loader!./theme-light.toml";
import themeDark from "raw-loader!./theme-dark.toml";

function getRelevantSettingsFile() {
        switch (useLocation().pathname) {
                case "/docs/configuration/yazi":
                        return yazi;
                case "/docs/configuration/keymap":
                        return keymap;
                
        }

}

function getDefaultAsCodeblock(data: object, section: string, key?: string) {
        // Get default value & stringify
        const rawData = key ? data[section][key] : data[section];
        const value = JSON.stringify(rawData);
        return (
                <code>{value}</code>
        )
}

// For raw=true
function _getRawtoml(defaultFileString: string, regex: RegExp, cb: (val: string) => string) {
        const toml = cb(defaultFileString.match(regex)[0])
        parse(toml)  // Sanity check
        return toml;
}

function getRawtoml(defaultFileString: string, section: string, key?: string, sectionRegexEnd:string="(^\\[|$(?![\\r\\n]))", keyRegexEnd="\]") {
        // return "\\[" + section + "\\](.|\\n)*?" + sectionRegexEnd
        const sectionToml = _getRawtoml(
                defaultFileString,
                new RegExp("\\[" + section + "\\](.|\n)*?" + sectionRegexEnd, "gm"),
                (val) => val.replace(/\]$\n\n^\[/m, "]")
        );
        if (!key) { return sectionToml; }
        else {
                return _getRawtoml(
                        sectionToml,
                        new RegExp(key + "(.|\n)*?" + keyRegexEnd, "gm"),
                        (val) => val)
        }
}

export function Defaults({section, searchKey}: {section: string, searchKey: string}) {
        const data = parse(getRelevantSettingsFile());

        const sectionSettings = data[section]
        const relevantSettings = Object.keys(sectionSettings).filter(setting => setting.includes(searchKey));
        const elements = relevantSettings.map(key => {
                return (
                        <li>
                                {key} = {getDefaultAsCodeblock(data, section, key)}
                        </li>
                )
        });
        return (
                <section class="default">
                        <p>Default values including <code>{searchKey}</code>:</p>
                        <ul>
                                {elements}
                        </ul>
                </section>
        )
}

export function DefaultWithProp({id, prop, value, regex, remove}: {id: string, prop:string, value: string, regex?:string, remove?:string}) {
        const [section, key] = id.split(".", 2);  // Get section & key
        const parsedRegex = new RegExp(regex || `.*${value}.*`)

        const data = parse(getRelevantSettingsFile())[section][key]  // TODO cleaner remove implementation
                .filter(obj => parsedRegex.test(obj[prop]) && !JSON.stringify(obj[prop]).includes(remove))
                .map(obj => (
                        <li>
                                On <code>{obj.on}</code> pressed,
                                run <code>{JSON.stringify(obj.run)}</code>
                                <br/>({obj.desc})
                        </li>
                ))
        if (data.length >= 1) {
                return ( <ul>{data}</ul> );
        } else {
                const dataFor = `${id} = [ { ${prop} = "${value}" } ]`
                return ( <p>No default is configured with <code>{dataFor}</code></p> )
        }

}

export default function Default({
        id, show_key,
        raw=false,
        asList=false,
        sectionRegexEnd=undefined,
        keyRegexEnd="\]", // TODO fix filetype/theme raw multiline output
        relevantFile=getRelevantSettingsFile(),
        ...props}: {
                id: string,
                show_key?: string,
                raw?: boolean,
                asList?: boolean,
                sectionRegexEnd?: string,
                keyRegexEnd?: string,
                relevantFile?: string,
                children?: any
        }) {
        const data = parse(relevantFile);
        const [section, key] = id.split(".", 2);  // Get section & key

        // Optionally add "for {key}" to output
        const p = `Default value ${show_key ? `for ${show_key}` : ""} is`

        if (!raw) {
                return (
                        <p className="default" {...props}>{p} {getDefaultAsCodeblock(data, section, key)}</p>
                )
        } else {
                return (
                        <section className="default">
                                <p {...props}>{p}:</p>
                                <CodeBlock language="toml">
                                        {getRawtoml(relevantFile, section, key, sectionRegexEnd, keyRegexEnd)}
                                </CodeBlock>
                        </section>

                )
        }
}

const SECTION_REGEXEND = "^\]";
const KEY_REGEXEND = "$"
export function DefaultTheme({id, ...props}) {
        const [section,key] = id.split(".", 2);

        const values = [themeDark, themeLight].map(theme => {
                const parsed = parse(theme);
                const value = key ? parsed[section][key] : parsed[section]

                return JSON.stringify(value);
        })
        
        if (values[0] == values[1]) {
                return (
                        <Default id={id} raw={true} keyRegexEnd="$" sectionRegexEnd={SECTION_REGEXEND} show_key="both themes" relevantFile={themeLight} {...props}/>
                )
        } else {
                return (
                        <section className="default">
                                <Default keyRegexEnd="$" id={id} raw={true} sectionRegexEnd={SECTION_REGEXEND} show_key="the light theme" relevantFile={themeLight} {...props} />
                                <Default keyRegexEnd="$" id={id} raw={true} sectionRegexEnd={SECTION_REGEXEND} show_key="the dark theme" relevantFile={themeDark} {...props}/>
                        </section>
                )
        }
        
}


