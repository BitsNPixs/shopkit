export function cx(...parts) {
    let out = "";
    for (const part of parts) {
        if (!part)
            continue;
        out = out ? `${out} ${part}` : part;
    }
    return out;
}
