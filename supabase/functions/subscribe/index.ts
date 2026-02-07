import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { email } = await req.json()

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? ''
        )

        const { error: dbError } = await supabase
            .from('subscribers')
            .insert({ email })

        if (dbError && !dbError.message.includes('unique')) {
            throw dbError
        }

        const MAILERLITE_KEY = Deno.env.get('MAILERLITE_API_KEY')
        if (MAILERLITE_KEY) {
            const mlResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MAILERLITE_KEY}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    groups: []
                })
            })

            if (!mlResponse.ok) {
                console.error('MailerLite Error:', await mlResponse.text())
            }
        }

        return new Response(
            JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
