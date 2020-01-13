export default function(shouldLogOut) {
    return {
        type: 'SHOULD_LOGOUT',
        shouldLogOut: shouldLogOut
    }
}